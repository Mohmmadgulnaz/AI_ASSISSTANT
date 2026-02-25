const express = require("express");
const router = express.Router();
const db = require("../db");
const docs = require("../docs.json");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

router.post("/", async (req,res)=>{

const {sessionId,message} = req.body;

if(!sessionId || !message){
 return res.status(400).json({error:"Missing sessionId or message"});
}

// insert session
db.run(`INSERT OR IGNORE INTO sessions(id) VALUES(?)`,[sessionId]);

// store user message
db.run(`INSERT INTO messages(session_id,role,content) VALUES(?,?,?)`,
[sessionId,"user",message]);

// fetch last 5 user+assistant pairs (10 messages)
db.all(`
SELECT role,content FROM messages
WHERE session_id=?
ORDER BY created_at DESC LIMIT 10
`,[sessionId], async (err,rows)=>{

if(err){
return res.status(500).json({error:"DB fetch error"});
}

const history = rows.reverse()
.map(r=>`${r.role}:${r.content}`).join("\n");

const docText = docs.map(d=>d.content).join("\n");

const prompt = `
You are a support assistant.

Only answer using the following docs:
${docText}

Chat history:
${history}

User Question:
${message}

If answer not present say exactly:
Sorry, I don’t have information about that.
`;

try{

 const completion = await client.chat.completions.create({
model:"gpt-4o-mini",
messages:[
{role:"user",content:prompt}
]
});
const reply = completion.choices[0].message.content;

// store assistant reply
db.run(`INSERT INTO messages(session_id,role,content) VALUES(?,?,?)`,
[sessionId,"assistant",reply]);

res.json({
reply,
tokensUsed:completion.usage.total_tokens
});

}catch(e){
console.log(e);
res.status(500).json({error:"LLM failure"});
}

});
});

module.exports = router;