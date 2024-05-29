import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";



export class MessageController{
    async sendMessage(req,res,next){
        try {
            const {message}=req.body;
            const receiverId=req.params.id;
            const senderId=req.user._id;
           
            let conversation=await ConversationModel.findOne({
                participants:{$all:[senderId,receiverId]},
            })
            if(!conversation){
                conversation=await ConversationModel.create({
                    participants:[senderId,receiverId]
                });
            }
            const newMessage=await MessageModel({
                senderId,receiverId,message
            })
            if(newMessage){
               conversation.messages.push(newMessage._id);
            }
            await Promise.all([conversation.save(),newMessage.save()]);
            res.status(201).json({newMessage});
        } catch (error) {
            console.log("error in sendMessage Controller ",error);
            res.status(500).json({error:"internal server error !"});
        }
    }
    async getMessage(req,res,next){
        try {
            const receiverId=req.params.id;
            const senderId=req.user._id;
            const conversation=await ConversationModel.findOne({
                participants:{$all:[senderId,receiverId]}
            }).populate("messages");
            if(!conversation){
                res.status(200).json([]);
            }
                res.status(200).json(conversation.messages);
            
        } catch (error) {
            console.log("error in getMessage Controller ",error);
            res.status(500).json({error:"internal server error !"});
        }
    }
}