import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        console.log("jwt token ",token);
        if(!token){
            return res.status(401).json({error:"UnAuthorized - No token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_Secret);
        if(!decoded){
            return res.status(401).json({error:"UnAuthorized - Invalid Token"});  
        }
        const user=await UserModel.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({error:"User not found"});  
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("error in protectRoute Middleware ",error);
        res.status(500).json({error:"Internal Server Error !"});
    }
}

export default protectRoute;