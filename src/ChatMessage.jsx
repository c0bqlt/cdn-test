import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import React from "react";

const ChatMessage = ({ text, sender }) => {
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`max-w-72 md:max-w-64 rounded-lg px-4 py-2 break-all ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-900"
        }`}
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        <ReactMarkdown components={MarkdownComponents}>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
