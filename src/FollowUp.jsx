import React from "react";

const FollowUp = ({ followUpQuestions, handleFollowUpClick }) => {
  return (
    <div className="p-2">
      {followUpQuestions.length > 0 && (
        <div>
          {followUpQuestions.map((question, index) => (
            <button
              key={index}
              className="w-full text-left bg-gray-100 p-2 mb-2 rounded hover:bg-gray-200"
              onClick={() => handleFollowUpClick(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowUp;
