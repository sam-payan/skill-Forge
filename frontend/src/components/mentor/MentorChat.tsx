import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, BookOpen, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "mentor";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "mentor",
    content:
      "Hello Alex! I'm your AI learning coach. I see you're working on React Hooks — how can I help you today?",
    timestamp: new Date(),
    suggestions: [
      "Explain useEffect dependencies",
      "When should I use useCallback?",
      "Help me debug my component",
    ],
  },
];

const quickActions = [
  { icon: BookOpen, label: "Explain", prompt: "Can you explain " },
  { icon: Lightbulb, label: "Hint", prompt: "I need a hint for " },
  { icon: Target, label: "Review", prompt: "Can you review my approach to " },
];

const MentorChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: input,
        timestamp: new Date(),
      },
    ]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "mentor",
          content:
            "Great question! useEffect lets you handle side effects. The dependency array controls when it runs. Empty array = run once on mount.",
          timestamp: new Date(),
          suggestions: ["Show patterns", "Cleanup examples", "useLayoutEffect"],
        },
      ]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <div className="flex flex-col h-full min-h-screen sm:min-h-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm sm:text-base truncate">
            AI Learning Coach
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            React Hooks Deep Dive
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-b border-border overflow-x-auto">
        <div className="flex gap-2 w-max">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="secondary"
              size="sm"
              className="gap-1.5 text-xs whitespace-nowrap"
              onClick={() => setInput(action.prompt)}
            >
              <action.icon className="w-3 h-3" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-2 sm:gap-3",
              message.role === "user" && "flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0",
                message.role === "mentor"
                  ? "bg-gradient-to-br from-primary to-accent"
                  : "bg-secondary"
              )}
            >
              {message.role === "mentor" ? (
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              ) : (
                <User className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </div>

            <div className="max-w-[85%] sm:max-w-[75%]">
              <div
                className={cn(
                  message.role === "mentor" ? "mentor-bubble" : "user-bubble"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>

              {message.suggestions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="px-3 py-1.5 rounded-full text-xs bg-secondary hover:bg-secondary/80"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="mentor-bubble">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 sm:px-4 py-3 border-t border-border">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your AI coach..."
            className="flex-1 px-3 sm:px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            variant="hero"
            size="icon"
            disabled={!input.trim()}
            onClick={handleSend}
            className="h-11 w-11 sm:h-12 sm:w-12 shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 text-center">
          Your coach adapts to your learning style
        </p>
      </div>
    </div>
  );
};

export default MentorChat;
