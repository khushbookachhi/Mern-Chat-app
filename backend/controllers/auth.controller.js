import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'; 
import generateTokenAndSetCookies from "../utils/generateToken.js";


export class AuthController{

    async signUpController(req,res,next){
        try {
         const {fullName,userName,password,confirmPassword,gender}=req.body;  
         console.log(req.body);
         if(password !== confirmPassword){
           return res.status(400).json({error:"Password does not match !"});
         }
         const user=await UserModel.findOne({userName});
         if(user){
            return res.status(400).json({error:"Username already exists !"});
         } 
         const hashPassword=await bcrypt.hash(password,10);
         const boyProfilePic=`https://avatar/.iran.liara.run/public/boy?username=${userName}`;
         const girlProfilePic=`https://avatar/.iran.liara.run/public/girl?username=${userName}`;
         const newUser=await UserModel({
            fullName,userName,password:hashPassword,gender,
            profilePic:gender==="male"?boyProfilePic:girlProfilePic
         });
        if(newUser){
            //generating token
            generateTokenAndSetCookies(newUser._id,res);
            await newUser.save();
            res.status(201).json({
               _id:newUser._id,
               fullName:newUser.fullName,
               userName:newUser.userName,
               profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({error:"Invalid User Data !"});  
        }
        
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"});
        }
      
        
    }
    async loginController(req,res,next){
        try {
         const {userName,password}=req.body;  
         console.log(req.body);
         const user=await UserModel.findOne({userName});
         const isPasswordCorrect=bcrypt.compare(password,user?.password || "");
         if(!user || !isPasswordCorrect ){
            res.status(400).json({error:"Invalid Credentials !"});  
         }
             //generating token
             generateTokenAndSetCookies(user._id,res);
            return res.status(400).json({
                _id:user._id,
                fullName:user.fullName,
                userName:user.userName,
                profilePic:user.profilePic
            });
      
        
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"});
        }   
    }
    async logoutController(req,res,next){
        try {
            res.cookie("jwt","",{ maxAge:0});
            res.status(200).json({message:"Logged Out Successfully !"});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"}); 
        }
    }
};