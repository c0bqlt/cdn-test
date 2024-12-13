import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "no-scroll-style";
    style.textContent = `
      .no-scroll {
        overflow: hidden;
        height: 100vh;
        touch-action: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById("no-scroll-style");
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen);

    if (!isChatOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  return (
    <div>
      {isChatOpen ? (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-full sm:h-auto sm:top-auto sm:bottom-5 sm:left-auto sm:translate-x-0 sm:right-5 bg-white shadow-lg sm:rounded-lg overflow-hidden z-[1000]">
          <ChatWindow onClose={toggleChatWindow} />
        </div>
      ) : (
        <div className="fixed bottom-5 right-5 z-[1000]">
          <button
            onClick={toggleChatWindow}
            className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary_hover animate-pulse"
          >
            <i className="fa-regular fa-message mx-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
