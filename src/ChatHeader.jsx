import React from "react";

const ChatHeader = ({ onClose }) => {
  return (
    <div
      style={{
        backgroundColor: "#3B82F6", // Tailwind's blue-500
        borderRadius: "0.5rem", // sm:rounded-lg
        color: "#FFFFFF", // text-white
        display: "flex", // flex
        justifyContent: "space-between", // justify-between
        alignItems: "center", // items-center
        padding: "0.25rem 1rem",
        marginBottom: "0.5rem", // mb-2
      }}
    >
      <h1 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>ChatWindow</h1>
      <button
        onClick={onClose}
        style={{
          color: "#FFFFFF", // text-white
          fontWeight: "bold", // font-bold
          fontSize: "1.125rem", // text-lg
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <i className="fas fa-xmark"></i>{" "}
        {/* Replaced FontAwesomeIcon with i element */}
      </button>
    </div>
  );
};

export default ChatHeader;
