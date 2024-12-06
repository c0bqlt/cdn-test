import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import React from "react";
import chatbotAvatar from "./assets/chatbot-avatar.png";

const ChatMessage = ({ text, sender }) => {
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } items-end`}
    >
      {sender === "system" && (
        <img src={chatbotAvatar} alt="chatbot avatar" className="h-8 mr-2" />
      )}

      <div
        className={`max-w-72 md:max-w-64 rounded-lg px-4 p-2 mb-2 ${
          sender === "user"
            ? "bg-primary text-white rounded-br-none"
            : "bg-gray-300 text-gray-900 rounded-bl-none"
        }`}
        style={{
          wordWrap: "normal",
          overflowWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        <ReactMarkdown components={MarkdownComponents}>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
