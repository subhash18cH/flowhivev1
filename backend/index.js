const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const userRoutes=require("./routes/userRoutes");
const profileRoutes=require("./routes/profileRoutes");

const dbConnection = require("./db/db");
const cors=require("cors")
dbConnection();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use("/auth",userRoutes);
app.use("/user/profile",profileRoutes);

app.get("/",(req,res)=>{
  res.send("Welcome to floedev app")
})

app.listen(process.env.PORT,()=>{
  console.log("server is running");
})