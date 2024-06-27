import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { connectUsingMongoose } from './config/mongooseConfig.js';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';
import { app, server } from './socket/socket.js';
dotenv.config();

const port=process.env.PORT || 8030;
const __dirname=path.resolve();
app.use(express.json()) // to parse the incoming requests with payloads (from req.body)
app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter);
app.use('/api/user',userRouter);

app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    connectUsingMongoose();
})