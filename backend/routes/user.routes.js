import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const userController=new UserController;
const userRouter=express.Router();  

userRouter.get('/',protectRoute,(req,res,next)=>{
    userController.getUserForSideBar(req,res,next);
})

export default userRouter;