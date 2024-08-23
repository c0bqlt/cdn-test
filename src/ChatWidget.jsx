import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chat-widget.css";

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {isChatOpen ? (
        <div className="chat-widget-chat-window-container">
          <ChatWindow onClose={toggleChatWindow} />
        </div>
      ) : (
        <div className="chat-window-button-container">
          <button
            onClick={toggleChatWindow}
            className={`chat-window-chat-button ${
              isHovered && "chat-window-chat-button-hover"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type="button"
          >
            Deschide chat-ul
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
