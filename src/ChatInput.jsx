import React from "react";

const ChatInput = ({ userInput, setUserInput, handleSend }) => {
  // Adjust the textarea height dynamically
  const handleInput = (e) => {
    e.target.style.height = "auto"; // Reset height to auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
    setUserInput(e.target.value); // Update state with the input value
  };

  // Reset the input and its height after sending
  const handleSendClick = () => {
    handleSend(); // Call the original send handler
    setUserInput(""); // Clear the input value
    const textarea = document.querySelector("textarea"); // Select the textarea
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
    }
  };

  // Handle sending the message on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents new line in textarea
      handleSend();
      setUserInput(""); 
      const textarea = document.querySelector("textarea"); 
      if (textarea) {
        textarea.style.height = "auto"; 
      }
    }
  };

  return (
    <div className="flex items-center mb-5 sm:mb-0">
      <textarea
        value={userInput}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Scrie un mesaj..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-base resize-none overflow-hidden"
        rows={1} // Start with one row
      />
      <button
        onClick={handleSendClick}
        className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary_hover"
      >
        <i className="fa-solid fa-paper-plane" />
      </button>
    </div>
  );
};

export default ChatInput;
