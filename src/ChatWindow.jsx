import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const initializeFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprintId = result.visitorId;
      setSessionId(fingerprintId);

      const fetchPreviousMessages = async () => {
        const response = await fetch(
          `${process.env.BACKEND_URL}/history/${fingerprintId}`
        );
        const data = await response.json();
        setMessages(data.messages || []);
      };

      fetchPreviousMessages();
    };

    if (!sessionId) {
      initializeFingerprint();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    setFollowUpQuestions([]);
    if (userInput.trim()) {
      const newMessage = {
        text: userInput,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setUserInput("");
      setLoading(true);
      // send user message to backend
      const response = await fetch(`${process.env.BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage.text,
          session_id: sessionId,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const blockMessage = errorData.detail;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: blockMessage, sender: "system", type: "block" },
        ]);
        setLoading(false);
      } else {
        // read the stream & process it as chunks arrive
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let accumulatedMessage = "";

        setMessages((prevMessages) => [...prevMessages, { sender: "bot" }]);
        setLoading(false);
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunk = decoder.decode(value);

          if (chunk) {
            accumulatedMessage += chunk;

            // update last message in the array
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1] = {
                text: accumulatedMessage,
                sender: "bot",
              };
              return updatedMessages;
            });
          }
        }
        //get the followup questions
        const followupResponse = await fetch(
          `${process.env.BACKEND_URL}/chat/followup/${sessionId}`
        );
        const followupData = await followupResponse.json();
        setFollowUpQuestions(followupData.followUp);
      }
    }
  };

  const handleFollowUpClick = (question) => {
    setUserInput(question);
    handleSend();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader onClose={onClose} />
      <ChatMessages
        messages={messages}
        messagesEndRef={messagesEndRef}
        followUpQuestions={followUpQuestions}
        handleFollowUpClick={handleFollowUpClick}
        loading={loading}
      />

      <div className="p-2">
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
