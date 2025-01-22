import ChatMessage from "./ChatMessage";
import React from "react";

const ResumePromptMessage = ({ handleUserChoice }) => {
  const promptText =
    "Există o conversație în defășurare. Dorești să o reiei sau să începi una nouă?";

  return (
    <div>
      <ChatMessage text={promptText} sender="bot" />
      <div className="flex justify-center mt-2 space-x-4">
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-800 focus:outline-none"
          onClick={() => handleUserChoice("resume")}
        >
          Reia
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-800 focus:outline-none"
          onClick={() => handleUserChoice("fresh")}
        >
          Reinițiază
        </button>
      </div>
    </div>
  );
};

export default ResumePromptMessage;