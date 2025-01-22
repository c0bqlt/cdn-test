import React, { useState, useEffect, useRef } from "react";
import { differenceInHours, parseISO } from "date-fns";
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
  const [resumePrompt, setResumePrompt] = useState(false);
  const [startConvTimestamp, setStartConvTimestamp] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState(null);
  const botMessageIndexRef = useRef(null); // Persistent index for the bot message

  useEffect(() => {
    const initializeFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprintId = result.visitorId;
      setSessionId(fingerprintId);

      const checkHistoryExists = async () => {
        const response = await fetch(
          `${process.env.BACKEND_URL}/history/${fingerprintId}`
        );
        const data = await response.json();

        if (data.messages && data.messages.length > 0) {
          const lastMessageDate = parseISO(data.last_message_timestamp);
          const convStart = parseISO(data.start_conv_timestamp);
          const hoursDifference = differenceInHours(
            new Date(),
            lastMessageDate
          );

          if (hoursDifference > 12) {
            // if more that 12h since past interaction, start fresh
            setMessages([]);
            setStartConvTimestamp(new Date().toISOString());
          } else {
            setFetchedMessages(data.messages); // store messages temporarily
            setStartConvTimestamp(convStart.toISOString());
            setResumePrompt(true);
          }
        } else {
          setStartConvTimestamp(new Date().toISOString());
          setMessages([]);
        }
      };

      checkHistoryExists();
    };

    if (!sessionId) {
      initializeFingerprint();
    }
  }, []);

  const handleUserChoice = (choice) => {
    setResumePrompt(false);
    if (choice === "resume") {
      if (fetchedMessages) {
        setMessages(fetchedMessages); // use the temporarily stored messages to display history
      }
    } else {
      setMessages([]); // clear messages in case of start from sratch
      setFetchedMessages(null);
      setStartConvTimestamp(new Date().toISOString());
    }
  };

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
                start_conv_timestamp: startConvTimestamp,
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
                    timestamp: new Date(),
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
        resumePrompt={resumePrompt}
        handleUserChoice={handleUserChoice}
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
