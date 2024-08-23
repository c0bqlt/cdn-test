import React, { useState } from "react";
import "./chat-input.css";

const ChatInput = ({ userInput, setUserInput, handleSend, handleKeyDown }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Scrie un mesaj..."
        className={`chat-input ${isFocused && "chat-input-focus"}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button
        onClick={handleSend}
        className={`chat-input-button ${
          isHovered && "chat-input-button-hover"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type="button"
      >
        <i className="fas fa-paper-plane chat-input-icon"></i>
      </button>
    </div>
  );
};

export default ChatInput;
