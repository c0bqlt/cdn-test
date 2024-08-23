import ChatMessage from "./ChatMessage";
import React from "react";
import "./chat-messages.css";

const ChatMessages = ({ messages, messagesEndRef }) => {
  return (
    <div className="chat-messages-container">
      {messages.map((msg, index) => (
        <ChatMessage key={index} text={msg.text} sender={msg.sender} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
