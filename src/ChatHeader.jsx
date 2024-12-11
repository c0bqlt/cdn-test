import React from "react";
import logo from "./assets/logo-for-chatbot.png";

const ChatHeader = ({ onClose }) => {
  return (
    <div className="bg-primary sm:rounded-lg text-white flex justify-between items-center py-3 px-4 mb-2 h-14">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-8" />
        <h1 className="text-lg font-bold text-white normal-case">Benone</h1>
      </div>
      <button
        onClick={onClose}
        className="text-white font-bold text-lg flex items-center"
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
};

export default ChatHeader;
