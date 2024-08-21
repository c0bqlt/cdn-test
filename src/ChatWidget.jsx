import React, { useState } from "react";
import ChatWindow from "./ChatWindow";

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {isChatOpen ? (
        <div
          style={{
            width: "100vw", // w-screen
            position: "fixed", // sm:fixed
            bottom: "1.25rem", // sm:bottom-5
            right: "1.25rem", // sm:right-5
            zIndex: 50, // sm:z-50
            maxWidth: "28rem", // sm:max-w-md (448px -> 28rem)
            margin: "0 auto", // sm:mx-auto
            backgroundColor: "#FFFFFF", // bg-white
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", // shadow-lg
            borderRadius: "0.5rem", // sm:rounded-lg
            overflow: "hidden", // overflow-hidden
          }}
        >
          <ChatWindow onClose={toggleChatWindow} />
        </div>
      ) : (
        <div
          style={{
            position: "fixed", // fixed
            bottom: "1.25rem", // bottom-5
            right: "1.25rem", // right-5
            zIndex: 50, // z-50
          }}
        >
          <button
            onClick={toggleChatWindow}
            style={{
              backgroundColor: "#3B82F6", // bg-blue-500
              color: "#FFFFFF", // text-white
              padding: "1rem", // p-4
              borderRadius: "9999px", // rounded-full
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", // shadow-lg
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              animation: "pulse 2s infinite",
              border: "none",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1E40AF")} // hover:bg-blue-700
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#3B82F6")}
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
