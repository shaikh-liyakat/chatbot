"use client"
import { useState, useRef, useEffect } from "react";
import "./globals.css";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      parts: [
        {
          text: "what is kali linux",
        },
      ],
      role: "user",
    }, 
  ]);
  const [input, setInput] = useState("");
  // const chatEndRef = useRef(null);


// send prompt to api

const SendPrompt= async(e)=>{
  // messages.push({
  //   parts:[{text:input}],
  //   role:"user"
  // })
  const newMessage = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ history: messages , input}),
  });

  setInput("");
  const data = await newMessage.json()

  console.log(data)
 console.log(data.history)
 setMessages(data.history)




}

  return (
    <div className="chat-wrapper">
      <div className="chat-header"> Chat</div>

      {/* <div className="chat-body">
        {messages.map((msg,index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div> */}

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          
        />
        <button onClick={SendPrompt}>Send</button>
      </div>
    </div>
  )
}
