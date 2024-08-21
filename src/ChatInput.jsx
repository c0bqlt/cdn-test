import React from "react";

const ChatInput = ({ userInput, setUserInput, handleSend, handleKeyDown }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Scrie un mesaj..."
        style={{
          flex: 1,
          padding: "0.5rem 1rem", // px-4 py-2
          border: "1px solid #D1D5DB", // Tailwind's default border color
          borderRadius: "0.5rem", // rounded-lg
          outline: "none", // focus:outline-none
          transition: "box-shadow 0.2s ease",
          fontSize: "17px",
        }}
        onFocus={(e) =>
          (e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.5)")
        } // focus:ring-1 focus:ring-blue-500
        onBlur={(e) => (e.target.style.boxShadow = "none")}
      />
      <button
        onClick={handleSend}
        style={{
          marginLeft: "0.5rem", // ml-2
          padding: "0.6rem 1rem", // px-4 py-2
          backgroundColor: "#3B82F6", // bg-blue-500
          color: "#FFFFFF", // text-white
          borderRadius: "0.5rem", // rounded-lg
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          border: "none",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#1E40AF")} // hover:bg-blue-700
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#3B82F6")}
      >
        <i className="fas fa-paper-plane" style={{ fontSize: "17px" }}></i>
      </button>
    </div>
  );
};

export default ChatInput;
