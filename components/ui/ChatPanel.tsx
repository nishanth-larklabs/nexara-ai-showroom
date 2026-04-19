"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useAssistantStore } from "@/store/useAssistantStore";
import { Bot, User, Send, X, MessageSquareText, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatchMutation = useAssistantStore((state) => state.dispatchMutation);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onFinish: (message: any) => {
      console.log("Stream finished", message);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Effect to process tool invocations using the modern `parts` array
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || latestMessage.role !== "assistant") return;

    for (const part of latestMessage.parts) {
      if (part.type === "tool-navigate_and_mutate") {
        const toolPart = part as any;

        const payload = toolPart.input;

        if (payload?.mutation) {
          dispatchMutation(payload.mutation);
        }

        if (payload?.section) {
          setTimeout(() => {
            const el = document.getElementById(payload.section);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 300);
        }
      }
    }
  }, [messages, dispatchMutation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInputValue("");
  };

  // Helper to extract display text from the parts array
  function getDisplayContent(msg: (typeof messages)[number]): string {
    // Extract all raw text parts
    const textContent = msg.parts
      .filter((p) => p.type === "text")
      .map((p: any) => p.text || "")
      .join("");

    if (msg.role === "user") {
      return textContent;
    }

    // For assistant messages, grab the reply from the tool's input
    for (const part of msg.parts) {
      if (part.type === "tool-navigate_and_mutate") {
        const payload = (part as any).input;
        if (payload?.reply) {
          return payload.reply;
        }
      }
    }

    // Fallback to text content if no tool reply exists
    return textContent;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            className="mb-4 w-95 sm:w-105 max-w-[calc(100vw-3rem)] h-150 max-h-[calc(100vh-8rem)] bg-white border border-[#e5e5e5] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#e5e5e5] bg-[#f3f3f3]/50 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white text-[#1c1b1b] flex items-center justify-center border border-[#e5e5e5] shadow-sm">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#1c1b1b] text-lg tracking-tight">
                    NEXARA Concierge
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#1c1b1b]" />
                    <p className="text-xs font-semibold text-[#474545] uppercase tracking-wider">
                      Online
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-[#474545] hover:text-[#1c1b1b] transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6 text-[#474545]">
                  <div className="w-20 h-20 rounded-full bg-[#f3f3f3] flex items-center justify-center text-[#1c1b1b]">
                    <MessageSquareText size={32} />
                  </div>
                  <p className="text-base font-medium leading-relaxed max-w-62.5">
                    How can I help you explore NEXARA today?
                  </p>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user";
                const displayContent = getDisplayContent(message);

                if (!displayContent && !isLoading) return null;

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={message.id}
                    className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full shrink-0 flex flex-col items-center justify-center mt-1
                      ${isUser ? "bg-[#1c1b1b] text-white" : "bg-[#f3f3f3] border border-[#e5e5e5] text-[#1c1b1b]"}
                    `}
                    >
                      {isUser ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`flex flex-col gap-1 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`px-5 py-4 text-[15px] leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-[#1c1b1b] text-white rounded-[1.5rem] rounded-tr-sm"
                            : "bg-[#f3f3f3] text-[#1c1b1b] rounded-[1.5rem] rounded-tl-sm"
                        }`}
                      >
                        {displayContent || (
                          <span className="flex items-center h-4 gap-1">
                            <span className="w-1.5 h-1.5 bg-[#1c1b1b]/40 rounded-full animate-bounce"></span>
                            <span
                              className="w-1.5 h-1.5 bg-[#1c1b1b]/40 rounded-full animate-bounce"
                              style={{ animationDelay: "0.15s" }}
                            ></span>
                            <span
                              className="w-1.5 h-1.5 bg-[#1c1b1b]/40 rounded-full animate-bounce"
                              style={{ animationDelay: "0.3s" }}
                            ></span>
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 flex-row">
                  <div className="w-8 h-8 rounded-full shrink-0 flex flex-col items-center justify-center mt-1 bg-[#f3f3f3] border border-[#e5e5e5] text-[#1c1b1b]">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                  <div className="px-5 py-4 rounded-[1.5rem] text-[15px] leading-relaxed bg-[#f3f3f3] text-[#474545] rounded-tl-sm flex gap-2 items-center font-medium">
                    Processing
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 border-t border-[#e5e5e5] bg-white shrink-0"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask NEXARA AI..."
                  className="w-full bg-[#f3f3f3] border-none rounded-full pl-6 pr-14 py-4 text-[15px] text-[#1c1b1b] font-medium focus:outline-none focus:ring-2 focus:ring-[#1c1b1b] transition-all placeholder:text-[#474545]/70"
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 w-10 h-10 rounded-full bg-[#1c1b1b] flex items-center justify-center text-white hover:bg-[#333] active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={16} className="ml-0.5" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#1c1b1b] text-white shadow-xl flex items-center justify-center group"
        aria-label="Toggle chat panel"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
            >
              <MessageSquareText size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
