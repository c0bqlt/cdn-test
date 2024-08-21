import ChatMessage from "./ChatMessage";
import React from "react";

const ChatMessages = ({ messages, messagesEndRef }) => {
  return (
    <div
      style={{
        flexGrow: 1, // flex-grow
        height: "20rem", // sm:h-80 (80 * 4 = 320px -> 20rem)
        overflowY: "auto", // overflow-y-auto
        marginBottom: "1rem", // mb-4
        padding: "0.5rem", // p-2
      }}
    >
      {messages.map((msg, index) => (
        <ChatMessage key={index} text={msg.text} sender={msg.sender} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
