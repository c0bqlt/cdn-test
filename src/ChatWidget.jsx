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
        <div className="w-screen h-screen sm:fixed sm:bottom-5 sm:right-5 sm:z-50 sm:max-w-md sm:mx-auto sm:h-auto bg-white shadow-lg sm:rounded-lg overflow-hidden">
          <ChatWindow onClose={toggleChatWindow} />
        </div>
      ) : (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={toggleChatWindow}
            className="bg-primary text-white p-4 px-5 rounded-full shadow-lg hover:bg-primary_hover animate-pulse"
          >
            <i className="fa-regular fa-message" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
