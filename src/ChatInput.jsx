import React from "react";

const ChatInput = ({ userInput, setUserInput, handleSend, handleKeyDown }) => {
  return (
    <div className="flex items-center mb-6 sm:mb-0">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Scrie un mesaj..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        onClick={handleSend}
        className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary_hover"
      >
        <i className="fa-solid fa-paper-plane" />
      </button>
    </div>
  );
};

export default ChatInput;
