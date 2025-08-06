const User = require("../models/user");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const allUsers = async (req , res)=>{
    try {
         const users = await User.find({}).select("-password");
         res.status(200).json(users);
    } catch (error) {
      res.status(500).json({message :"internal server error"});
    }

}

const Signup = async (req, res)=>{

       try {
         const { email, password ,name , role , isVerified} = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);

        const user = new User({
           name:name,
           email:email,
           password:hashedPassword,
           role:role,
          isVerified : true,
         });

         await user.save();

       const token = generateToken(user);

        res.cookie("token",token,{
             httpOnly: true,   
             secure: false, 
             sameSite: "lax", 
              maxAge: 24*60*60*1000,  
        });


       res.status(200).json({
        message: "Signup successfully",
         id:user._id ,
        name,
        email,
        hashedPassword,
        role,
        isVerified,
        token,
    });
        
       } catch (error) {
        console.log(error);
        res.status(500).json({message:"Sigup failed" , error : error.message});
       }

};

const Login =  async (req, res) =>{
   
    try {
      const {email , password} = req.body;
         const user = await User.findOne({email});
   if(!user){
      return res.status(400).json({message :"Invalid Email or Password"});
   }
   const isMatch = await bcrypt.compare(password , user.password);
   if(!isMatch){
      return res.status(400).json({message : "Invalid Email or Password"});
   }

   const token = generateToken(user);
   
   res.cookie("token",token,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    maxAge:24 * 60 * 60 * 1000,
   });

   res.status(200).json({
    message :"Login successfully",
    id:user._id,
    name:user.name,
    email:user.email,
    role:user.role,
    isVerified : user.isVerified,
    token,
   });

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "login failed", error : error.message});
    }   
};

const updateUser = async (req , res) =>{
     try {
         const id = req.params.id;
      const {role} = req.body;
      const user = await User.findById(id);
      if(!user){
            return res.status(403).json({message:"user not found"});
      }
      user.role = role;
      await user.save();
     
      res.status(200).json({
      message: "User role updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
     
     } catch (error) {
         res.status(500).json({ message: "Server error", error: error.message });
     }

}

const deleteUser = async (req, res)=>{
    try {
          const id = req.params.id;
          const user = await User.findByIdAndDelete(id);
          if(!user){
            return res.status(403).json({message: "user not found"});
          }
         
          res.status(200).json({
            message:"user deleted successfully",
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
          });
      
    } catch (error) {
        res.status(500).json({message :"server error", error : error.message});
    }
}


module.exports = {Signup, Login , updateUser ,deleteUser ,allUsers};