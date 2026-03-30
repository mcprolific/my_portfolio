import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import aiImage from "../assets/ai_assistant.jpg";

/* Animations */
const floatPulse = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const slideFadeRight = {
  hidden: { opacity: 0, x: 120, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, x: 120, scale: 0.95 },
};

const AICopilot = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hello! I am your AI Portfolio. Ask me anything strictly about my CV.",
    },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    // Add empty assistant bubble
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const res = await fetch(`${API_BASE}/ask-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userText }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        fullText += decoder.decode(value);

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            text: fullText,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "Sorry, I could not connect to the CV assistant at the moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        variants={floatPulse}
        animate="animate"
        whileHover={{ scale: 1.15 }}
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-50 w-16 h-16 rounded-full shadow-2xl border-4 border-white overflow-hidden bg-white"
      >
        <img src={aiImage} alt="AI" className="w-full h-full object-cover" />
      </motion.button>

      {/* CHAT PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={slideFadeRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-6 bottom-24 w-[400px] h-[540px] z-50 rounded-2xl shadow-2xl overflow-hidden bg-white border flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <img src={aiImage} className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-sm">AI Portfolio</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <img src={aiImage} className="w-6 h-6 rounded-full mt-1" />
                  )}
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                    {loading &&
                      i === messages.length - 1 &&
                      msg.role === "assistant" && (
                        <span className="ml-2 animate-pulse">...</span>
                      )}
                  </div>
                  {msg.role === "user" && (
                    <FaUserCircle className="text-gray-600 mt-1" />
                  )}
                </div>
              ))}
              {/* scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 border-t flex gap-2 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask strictly about my CV..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AICopilot;
