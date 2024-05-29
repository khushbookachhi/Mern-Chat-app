import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectUsingMongoose } from './config/mongooseConfig.js';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';
dotenv.config();
const app=express();
const port=process.env.PORT || 5000;

app.use(express.json()) // to parse the incoming requests with payloads (from req.body)
app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter);
app.use('/api/user',userRouter);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    connectUsingMongoose();
})