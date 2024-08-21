import React from "react";

const ChatMessage = ({ text, sender }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: sender === "user" ? "flex-end" : "flex-start", // justify-end / justify-start
        marginBottom: "0.5rem", // mb-2
      }}
    >
      <div
        style={{
          maxWidth: "12rem", // max-w-48 (for small screens)
          borderRadius: "0.5rem", // rounded-lg
          padding: "0.5rem 1rem", // px-4 py-2
          wordBreak: "break-all", // break-all
          backgroundColor: sender === "user" ? "#3B82F6" : "#D1D5DB", // bg-blue-500 / bg-gray-300
          color: sender === "user" ? "#FFFFFF" : "#1F2937", // text-white / text-gray-900
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
