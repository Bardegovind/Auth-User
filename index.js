const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 5051;
const MongoDB_Url = `mongodb+srv://studentdelta23:CLUSTER%402001@cluster0.a6kn9of.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
main().then((res)=>{
    console.log("mongoDB has connected successfully");
}).catch((err)=>{
    console.log("Something went Wrong in mongoDB connection");
});

 async function main(){ 
    
    await mongoose.connect(MongoDB_Url);
}
    
app.use(cors({
  origin: "http://127.0.0.1:5500",  // or 'localhost:5500' — must match your frontend // http://127.0.0.1:5500
  credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

app.use("/api/users/", userRoutes);


app.listen(PORT ,()=>{
   console.log(`Server Has Been Started At Port ${PORT}`);
});