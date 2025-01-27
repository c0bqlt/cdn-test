import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import React from "react";
import chatbotAvatar from "./assets/chatbot-avatar.png";
import {isValid, parseISO,format } from "date-fns";

const ChatMessage = ({ text, sender, createdAt }) => {
  const parsedDate =
    typeof createdAt === "string" ? parseISO(createdAt) : createdAt;

  const formattedTime = isValid(parsedDate)
    ? format(parsedDate, "HH:mm") 
    : "";

  // Determine styling and alignment based on sender type
  const getMessageStyles = (sender) => {
    if (sender === "error") {
      return {
        container:
          "bg-red-100 text-red-800 rounded-md border border-red-500 text-center",
        icon: "⚠️",
        wrapper: "justify-center", // Center the error message
        timestampAlignment: null,
        includeTimestamp: false,
      };
    }
    return sender === "user"
      ? {
          container: "bg-primary text-white rounded-br-none",
          icon: null,
          wrapper: "justify-end",
          timestampAlignment: "text-left",
          includeTimestamp: true,
        }
      : {
          container: "bg-gray-300 text-gray-900 rounded-tl-none",
          icon: null,
          wrapper: "justify-start",
          timestampAlignment: "text-right",
          includeTimestamp: true,
        };
  };

  const { container, icon, wrapper, timestampAlignment, includeTimestamp } =
    getMessageStyles(sender);

  return (
    <div className={`flex ${wrapper} items-start`}>
      {sender === "bot" && (
        <img src={chatbotAvatar} alt="chatbot avatar" className="h-8 mr-2" />
      )}

      <div className="flex flex-col">
        <div
          className={`max-w-72 md:max-w-64 rounded-lg px-4 p-2 mb-1 ${container}`}
          style={{
            wordWrap: "normal",
            overflowWrap: "break-word",
            whiteSpace: "normal",
            lineHeight: "1.2",
          }}
        >
          {icon && <span className="mr-2">{icon}</span>}
          <ReactMarkdown components={MarkdownComponents}>{text}</ReactMarkdown>
        </div>
        {includeTimestamp && (
          <span
            className={`text-xs text-gray-500 ${
              timestampAlignment === "text-left" ? "self-start" : "self-end"
            }`}
          >
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
