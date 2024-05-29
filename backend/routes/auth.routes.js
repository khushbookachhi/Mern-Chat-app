import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
const authRouter=express.Router();
const authController=new AuthController;

authRouter.post("/signup",(req,res,next)=>{
    authController.signUpController(req,res,next);
})
authRouter.post("/login",(req,res,next)=>{
    authController.loginController(req,res,next);
})
authRouter.post("/logout",(req,res,next)=>{
    authController.logoutController(req,res,next);
})

export default authRouter;