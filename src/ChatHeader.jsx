import React from "react";

const ChatHeader = ({ onClose }) => {
  return (
    <div className="bg-blue-500 sm:rounded-lg text-white flex justify-between items-center py-3 px-4 mb-2">
      <h1 className="text-lg font-bold">ChatWindow</h1>
      <button onClick={onClose} className="text-white font-bold text-lg">
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
};

export default ChatHeader;
