import React from "react";
import "./chat-message.css";

const ChatMessage = ({ text, sender }) => {
  return (
    <div
      className={`chat-message-container ${
        sender === "user"
          ? "chat-message-user-message"
          : "chat-message-bot-message"
      }`}
    >
      <div
        className={`chat-message ${
          sender === "user"
            ? "chat-message-user-message-text"
            : "chat-message-bot-message-text"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
