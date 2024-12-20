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
  const botMessageIndexRef = useRef(null); // Persistent index for the bot message

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
      setLoading(true); // Start loading

      const timeoutDuration = 10000; // Timeout duration in ms

      // Function to attempt fetch with retries
      const fetchWithRetry = async (retryCount = 1) => {
        for (let attempt = 0; attempt <= retryCount; attempt++) {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), timeoutDuration);

          try {
            const response = await fetch(`${process.env.BACKEND_URL}/chat`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: newMessage.text,
                session_id: sessionId,
              }),
              signal: controller.signal,
            });

            setLoading(false);

            clearTimeout(timeout);

            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let accumulatedMessage = "";

            // Add bot message placeholder ONCE
            if (botMessageIndexRef.current === null) {
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.push({ text: "", sender: "bot" });
                botMessageIndexRef.current = updatedMessages.length - 1; // Store index
                return updatedMessages;
              });
            }

            // Stream response and update the placeholder
            while (!done) {
              const { value, done: doneReading } = await reader.read();
              done = doneReading;
              const chunk = decoder.decode(value);

              if (chunk) {
                accumulatedMessage += chunk;

                // Update the bot message in place
                setMessages((prevMessages) => {
                  const updatedMessages = [...prevMessages];
                  updatedMessages[botMessageIndexRef.current] = {
                    text: accumulatedMessage,
                    sender: "bot",
                  };
                  return updatedMessages;
                });
              }
            }

            // Reset botMessageIndexRef and loading state after success
            botMessageIndexRef.current = null;
            setLoading(false);

            // Fetch follow-up questions
            const followupResponse = await fetch(
              `${process.env.BACKEND_URL}/chat/followup/${sessionId}`
            );
            const followupData = await followupResponse.json();
            setFollowUpQuestions(followupData.followUp);

            return; // Success, exit retry loop
          } catch (err) {
            clearTimeout(timeout);
            if (err.name === "AbortError") {
              console.error("Request timed out. Retrying...");
            } else {
              console.error(`Attempt ${attempt + 1} failed:`, err.message);
            }

            if (attempt === retryCount) {
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  text: "Mesajul nu s-a putut trimite. Vă rugăm să încercați mai târziu.",
                  sender: "error",
                },
              ]);
              botMessageIndexRef.current = null;
              setLoading(false); // Ensure loading is reset even after failure
            }
          }
        }
      };

      await fetchWithRetry(1); // Retry once
      setLoading(false); // Extra safeguard to reset loading
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
