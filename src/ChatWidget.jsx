import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Prevent scrolling when chat is open on mobile
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isChatOpen]);

  const toggleChatWindow = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <div>
      {isChatOpen ? (
        <div
          className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 bg-white shadow-lg sm:rounded-lg overflow-hidden z-[1000] 
            w-screen h-screen sm:w-[320px] sm:h-[500px]"
        >
          <ChatWindow onClose={toggleChatWindow} />
        </div>
      ) : (
        <div className="fixed bottom-5 right-5 z-[1000]">
          <button
            onClick={toggleChatWindow}
            className="bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary_hover flex items-center justify-center"
          >
            <i className="fa-regular fa-message mx-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
