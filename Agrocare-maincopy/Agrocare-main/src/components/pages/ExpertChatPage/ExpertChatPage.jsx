import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../layout/PageWrapper";

// Base URL of your backend (server.js). Change this when you deploy
// (e.g. to your production API URL) instead of localhost.
const BACKEND_URL = "http://localhost:5000";
const CHAT_ENDPOINT = `${BACKEND_URL}/api/chat`;
const MAX_RETRIES = 3;

const ExpertChatPage = ({ isDarkMode }) => {
  const chatContainerRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      text: "Namaste! I am your Krishi Sahayak 🌾 How can I assist you with your crops today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  // Auto-scroll when new message appears
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userMessage = inputMessage.trim();
    const newHistory = [...chatHistory, { role: "user", text: userMessage }];

    setInputMessage("");
    setIsSending(true);
    setChatHistory(newHistory);
    setError(null);

    try {
      // Backend (chatController.js) expects: { message: "..." }
      // and already applies the Krishi Sahayak system prompt itself,
      // so we just send the latest user message.
      const payload = { message: userMessage };

      let replyText = null;
      let lastError = null;

      // Retry logic with exponential backoff
      for (let i = 0; i < MAX_RETRIES; i++) {
        try {
          const response = await fetch(CHAT_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const data = await response.json();

          if (data.success && data.reply) {
            replyText = data.reply;
            break;
          } else {
            throw new Error(data.message || "No valid response from server.");
          }
        } catch (err) {
          lastError = err;
          if (i < MAX_RETRIES - 1) {
            await new Promise((res) =>
              setTimeout(res, Math.pow(2, i) * 1000)
            );
          }
        }
      }

      if (replyText) {
        setChatHistory((prev) => [
          ...prev,
          { role: "model", text: replyText },
        ]);
      } else {
        throw new Error(
          `Failed to get response after ${MAX_RETRIES} attempts: ${lastError?.message}`
        );
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setError(`Network or API error: ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

  // --- UI Styling ---
  const userBubble =
    "bg-emerald-500 text-white p-3 rounded-xl rounded-br-none max-w-xs md:max-w-md shadow-md";
  const modelBubble = `p-3 rounded-xl rounded-tl-none max-w-xs md:max-w-md shadow-md ${
    isDarkMode ? "bg-gray-700 text-gray-50" : "bg-gray-100 text-gray-900"
  }`;
  const inputClass = `flex-1 p-3 rounded-lg border focus:ring-emerald-500 focus:border-emerald-500 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white"
      : "bg-gray-50 border-gray-300 text-gray-900"
  }`;

  return (
    <PageWrapper title="Krishi Sahayak Chat" isDarkMode={isDarkMode}>
      <div className="flex flex-col h-[70vh] max-h-[700px] border border-gray-600 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-emerald-600 text-white font-semibold">
          Krishi Sahayak (AI Expert) 🧑‍🌾
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className={msg.role === "user" ? userBubble : modelBubble}>
                {msg.text}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex justify-start">
              <div
                className={`${modelBubble} italic text-gray-500 flex items-center`}
              >
                <span className="animate-pulse">Krishi Sahayak is typing...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-2 bg-red-500/10 text-red-400 rounded-lg text-sm text-center">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Input Section */}
        <form
          onSubmit={sendMessage}
          className="p-4 border-t border-gray-600 flex space-x-2"
        >
          <input
            type="text"
            placeholder="Ask your farming query here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className={inputClass}
            disabled={isSending}
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg font-semibold transition disabled:bg-gray-500"
            disabled={isSending || !inputMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default ExpertChatPage;