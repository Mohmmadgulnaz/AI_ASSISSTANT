import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {

const [msg,setMsg]=useState("");
const [chat,setChat]=useState([]);
const [sessionId,setSessionId]=useState("");
const [loading,setLoading]=useState(false);

useEffect(()=>{

let sid = localStorage.getItem("sessionId");

if(!sid){

// timestamp based session id (assignment allowed)
sid = "session_" + Date.now() + "_" + Math.floor(Math.random()*1000);

localStorage.setItem("sessionId",sid);
}

setSessionId(sid);

},[]);

const send = async ()=>{

if(!msg.trim()) return;

setLoading(true);

setChat(prev=>[
...prev,
{role:"user",content:msg}
]);

try{

const res = await axios.post(
"http://localhost:5000/api/chat",
{
sessionId,
message:msg
}
);

setChat(prev=>[
...prev,
{role:"assistant",content:res.data.reply}
]);

setMsg("");
setLoading(false);

}catch(e){
setLoading(false);
alert("Server error");
}

};

return(
<div style={{
width:"450px",
margin:"auto",
background:"#f4f7ff",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 0 10px gray"
}}>

<div style={{height:"300px",overflowY:"auto"}}>

{chat.map((m,i)=>(
<div key={i}
style={{
background:m.role==="user"?"#cce5ff":"#d4edda",
padding:"10px",
margin:"10px",
borderRadius:"10px"
}}>
<b>{m.role}</b>: {m.content}
</div>
))}

{loading && <p>AI is typing...</p>}

</div>

<input
value={msg}
onChange={e=>setMsg(e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"1px solid gray"
}}
/>

<button
onClick={send}
style={{
marginTop:"10px",
padding:"10px",
width:"100%",
background:"#4CAF50",
color:"white",
border:"none",
borderRadius:"10px"
}}>
Send
</button>

</div>
);
}