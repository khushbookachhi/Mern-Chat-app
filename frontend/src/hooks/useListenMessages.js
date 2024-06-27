import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext.jsx'
import useConversation from '../zustand/useConversation.js';
import notificationSound from '../assets/sounds/notification.mp3';
const useListenMessages = () => {
 const {socket}=useSocketContext();
 const {messages,setMessages}=useConversation();

 useEffect(()=>{
 socket?.on("newMessage",(newMessage)=>{
   newMessage.shouldShake=true;
   if(notificationSound){
      console.log("notification sound ",notificationSound);
      const playsound=new Audio(notificationSound);
      playsound.play();
   }
  
   console.log("useListenHooks ",newMessage);
    setMessages([...messages,newMessage])
 })
 return ()=> socket?.off("newMessage")
 },[socket,setMessages,messages])
}

export default useListenMessages;