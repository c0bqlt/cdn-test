import ChatMessage from "./ChatMessage";
import FollowUp from "./FollowUp";
import React from "react";

const ChatMessages = ({
  messages,
  messagesEndRef,
  followUpQuestions,
  handleFollowUpClick,
  loading,
}) => {
  return (
    <div className="flex-grow sm:h-80 overflow-y-auto mb-4 p-2">
      {messages.map((msg, index) => (
        <ChatMessage key={index} text={msg.text} sender={msg.sender} />
      ))}
      {loading && (
        <div className="flex mb-4 max-w-[65%] justify-self-start">
          <div
            className="max-w-72 md:max-w-64 rounded-lg px-4 py-2 bg-gray-300 text-black flex items-center justify-center animate-pulse-text"
            style={{
              height: "40px",
            }}
          >
            Se gândește...
          </div>
        </div>
      )}
      <FollowUp
        followUpQuestions={followUpQuestions}
        handleFollowUpClick={handleFollowUpClick}
      />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
