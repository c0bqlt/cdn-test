import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import React from "react";

const ChatMessage = ({ text, sender }) => {
  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-72 md:max-w-64 rounded-lg px-4 p-2 mb-2 ${
          sender === "user"
            ? "bg-primary text-white"
            : "bg-gray-300 text-gray-900"
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
