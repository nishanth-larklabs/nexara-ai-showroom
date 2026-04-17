'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useAssistant } from '@/context/AssistantContext';
import { Bot, User, Send, X, MessageSquareText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { AINavigateAndMutate } from '@/types/ai';

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatchMutation } = useAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    onFinish: (message: any) => {
      console.log('Stream finished', message);
    }
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Effect to process tool invocations from message parts and trigger mutations
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || latestMessage.role !== 'assistant') return;

    for (const part of latestMessage.parts) {
      // Tool parts in v6 are typed as `tool-{toolName}`, or as DynamicToolUIPart with type 'dynamic-tool'
      if (
        (part as any).type === 'tool-navigate_and_mutate' ||
        ((part as any).type === 'dynamic-tool' && (part as any).toolName === 'navigate_and_mutate')
      ) {
        const toolPart = part as any;
        const input = toolPart.input as AINavigateAndMutate | undefined;

        if (input?.mutation) {
          dispatchMutation(input.mutation);
        }

        if (input?.section) {
          setTimeout(() => {
            const el = document.getElementById(input.section);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    setInputValue('');
  };

  // Helper to extract display text from a message's parts
  function getDisplayContent(msg: (typeof messages)[number]): string {
    const isUser = msg.role === 'user';

    if (isUser) {
      // User messages: concatenate text parts
      return msg.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map((p) => p.text)
        .join('');
    }

    // Assistant messages: prefer the reply from the tool invocation
    for (const part of msg.parts) {
      if (
        (part as any).type === 'tool-navigate_and_mutate' ||
        ((part as any).type === 'dynamic-tool' && (part as any).toolName === 'navigate_and_mutate')
      ) {
        const input = (part as any).input as AINavigateAndMutate | undefined;
        if (input?.reply) return input.reply;
      }
    }

    // Fall back to text parts
    const textContent = msg.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('');

    return textContent;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="mb-4 w-[380px] sm:w-[420px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] glass border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground leading-tight">NEXARA Concierge</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs text-muted-foreground">AI Assistant Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-muted-foreground">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <MessageSquareText size={32} />
                  </div>
                  <p className="text-sm">
                    How can I help you explore NEXARA today? Try asking to see cars under a budget, compare two models, or book a test drive.
                  </p>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === 'user';
                const displayContent = getDisplayContent(message);

                if (!displayContent && !isLoading) return null;

                return (
                  <div key={message.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex flex-col items-center justify-center -mt-1
                      ${isUser ? 'bg-white/10 text-foreground' : 'bg-primary/20 text-primary border border-primary/30'}
                    `}>
                      {isUser ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isUser 
                          ? 'bg-white/10 text-foreground rounded-tr-sm' 
                          : 'bg-black/40 text-foreground border border-white/5 rounded-tl-sm'
                      }`}>
                        {displayContent || (
                          <span className="animate-pulse flex items-center h-4">
                            <span className="w-2 h-2 bg-primary rounded-full mr-1.5"></span>
                            <span className="w-2 h-2 bg-primary rounded-full mr-1.5"></span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3 flex-row">
                  <div className="w-8 h-8 rounded-full shrink-0 flex flex-col items-center justify-center -mt-1 bg-primary/20 text-primary border border-primary/30">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed bg-black/40 text-muted-foreground border border-white/5 rounded-tl-sm animate-pulse flex gap-1 items-center">
                     Analyzing intent...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/60 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask NEXARA AI..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:bg-primary/50"
                  aria-label="Send message"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-px" />}
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
        className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)] flex items-center justify-center relative group isolate"
        aria-label="Toggle chat panel"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
              <MessageSquareText size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </motion.button>
    </div>
  );
}
