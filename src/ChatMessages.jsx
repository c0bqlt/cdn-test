import ChatMessage from "./ChatMessage";
import FollowUp from "./FollowUp";
import React from "react";
import chatbotAvatar from "./assets/chatbot-avatar.png";

const ChatMessages = ({
  messages,
  messagesEndRef,
  followUpQuestions,
  handleFollowUpClick,
  loading,
}) => {
  const systemMessage = {
    text: "Salut! Cum te pot ajuta?",
    sender: "system",
  };

  if (messages.length === 0) {
    messages.push(systemMessage);
  }

  return (
    <div className="flex-grow sm:h-80 overflow-y-auto mb-4 p-2">
      {messages.map((msg, index) => (
        <ChatMessage key={index} text={msg.text} sender={msg.sender} />
      ))}
      {loading && (
        <div className="flex justify-start items-end">
          <img src={chatbotAvatar} alt="chatbot avatar" className="h-8 mr-2" />
          <div className="text-left rtl:text-right max-w-40 rounded-lg rounded-bl-none px-4 py-2 bg-gray-300 flex justify-center items-center px-4 p-2 mb-2">
            <div
              className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-gray-600 border-t-primary"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
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
