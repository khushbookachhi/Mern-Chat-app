import express from 'express';
import { MessageController } from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const messageController= new MessageController;
const messageRouter=express.Router();

messageRouter.post("/send/:id",protectRoute,(req,res,next)=>{
    messageController.sendMessage(req,res,next);
})
messageRouter.get("/:id",protectRoute,(req,res,next)=>{
    messageController.getMessage(req,res,next);
})


export default messageRouter;
