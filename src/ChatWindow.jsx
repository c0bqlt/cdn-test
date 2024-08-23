import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import "./chat-window.css";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchBotResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello World");
      }, 400);
    });
  };

  const handleSend = async () => {
    if (userInput.trim()) {
      const newMessage = { text: userInput, sender: "user" };
      setMessages([...messages, newMessage]);
      setUserInput("");

      //simulate api call
      const botResponse = await fetchBotResponse(userInput);

      //update messages
      setMessages([
        ...messages,
        newMessage,
        { text: botResponse, sender: "bot" },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-window-container">
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
      <div className="chat-window-input-container">
        <ChatInput
          userInput={userInput}
          setUserInput={setUserInput}
          handleSend={handleSend}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
