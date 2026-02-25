require("dotenv").config();
const express=require("express");
const cors=require("cors");
const rateLimit=require("express-rate-limit");
require("./db");

const chatRoute=require("./routes/chat");

const app=express();

app.use(cors());
app.use(express.json());

app.use(rateLimit({
windowMs:15*60*1000,
max:100
}));

app.use("/api/chat",chatRoute);

app.listen(5000,()=>{
console.log("Server running");
});
