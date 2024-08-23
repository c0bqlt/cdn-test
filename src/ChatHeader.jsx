import React from "react";
import "./chat-header.css"; // Import the CSS Module

const ChatHeader = ({ onClose }) => {
  return (
    <div className="chat-header">
      <h1 className="chat-title">ChatWindow</h1>
      <button onClick={onClose} className="chat-close-button">
        <i className="fas fa-xmark transparent-background"></i>
      </button>
    </div>
  );
};

export default ChatHeader;
