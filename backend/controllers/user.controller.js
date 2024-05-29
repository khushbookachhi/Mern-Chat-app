import UserModel from "../models/user.model.js";


export class UserController{
    async getUserForSideBar(req,res,next){
        try {
            const loggedInuser=req.user._id;
            const filteredUsers=await UserModel.find({_id:{$ne:loggedInuser}}).select("-password");
            res.status(200).json(filteredUsers);
        } catch (error) {
            console.log("error in getUserForSideBar Controller ",error);
            res.status(500).json({error:"internal server error !"});
        }
    }
}