import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import React from "react";
import chatbotAvatar from "./assets/chatbot-avatar.png";

const ChatMessage = ({ text, sender, createdAt }) => {
  const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };

  const formattedTime = isValidDate(createdAt)
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // Determine styling based on sender type
  const getMessageStyles = (sender) => {
    if (sender === "error") {
      return {
        container:
          "bg-red-100 text-red-800 rounded-md border border-red-500 text-center",
        icon: "⚠️",
        wrapper: "justify-center", // Center the error message
        includeTimestamp: false,
      };
    }
    return sender === "user"
      ? {
          container: "bg-primary text-white rounded-br-none",
          icon: null,
          wrapper: "justify-end",
          includeTimestamp: true,
        }
      : {
          container: "bg-gray-300 text-gray-900 rounded-tl-none",
          icon: null,
          wrapper: "justify-start",
          includeTimestamp: true,
        };
  };

  const { container, icon, wrapper, includeTimestamp } =
    getMessageStyles(sender);

  return (
    <div className={`flex ${wrapper} items-start`}>
      {sender === "bot" && (
        <img src={chatbotAvatar} alt="chatbot avatar" className="h-8 mr-2" />
      )}

      <div className="flex flex-col items-end">
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
          <span className="text-xs text-gray-500">{formattedTime}</span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
