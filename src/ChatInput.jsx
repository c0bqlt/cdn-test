import React from "react";

const ChatInput = ({ userInput, setUserInput, handleSend, handleKeyDown }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Scrie un mesaj..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        <i className="fa-solid fa-paper-plane" />
      </button>
    </div>
  );
};

export default ChatInput;
