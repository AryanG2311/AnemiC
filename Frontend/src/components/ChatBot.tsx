import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

const preloadedQAs = [
  {
    question: "What is anaemia?",
    answer:
      "Anaemia is a condition where your blood doesn't have enough healthy red blood cells or hemoglobin to carry oxygen around your body. This makes you feel tired and weak.",
  },
  {
    question: "Why does it happen in teens?",
    answer:
      "Teens are at higher risk because of rapid growth spurts, poor eating habits, heavy menstrual periods (in girls), and not getting enough iron-rich foods in their diet.",
  },
  {
    question: "What happens if untreated?",
    answer:
      "Untreated anaemia can lead to extreme fatigue, poor concentration in school, weakened immune system, and in severe cases, heart problems. It's important to get proper treatment!",
  },
  {
    question: "What can I do (diet, supplements, lifestyle)?",
    answer:
      "Eat iron-rich foods like spinach, beans, lean meat, and fortified cereals. Take iron supplements if recommended by a doctor. Avoid tea/coffee with meals as they reduce iron absorption. Get enough sleep and exercise regularly!",
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm AnaemiBot 🤖 Ask me anything about anaemia, or click on the quick questions below!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (type: "bot" | "user", content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleQuickQuestion = async (qa: (typeof preloadedQAs)[0]) => {
    addMessage("user", qa.question);
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsTyping(false);
    addMessage("bot", qa.answer);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-primary hover:bg-gradient-accent shadow-2xl hover-lift animate-pulse-glow"
        >
          {isOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <MessageCircle className="w-8 h-8 text-white animate-float" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[480px] z-40 animate-fade-in-up">
          <Card className="flex h-full flex-col glass-card border-2 border-primary/30 shadow-2xl rounded-2xl overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-gradient-primary text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AnaemiBot</h3>
                    <p className="text-xs text-white/70">
                      Ask me about anaemia!
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Body */}
            <CardContent className="flex flex-1 flex-col p-0">
              {/* Messages scroll area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.type === "bot" && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] p-3 rounded-2xl break-words ${
                        message.type === "user"
                          ? "bg-gradient-accent text-white rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`text-xs mt-1 opacity-70 ${
                          message.type === "user"
                            ? "text-white/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>

                    {message.type === "user" && (
                      <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
                        <div
                          className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions (pinned at bottom, non-scroll) */}
              <div className="p-4 border-t border-border bg-background/80 backdrop-blur">
                <p className="text-xs text-muted-foreground mb-2">
                  Quick Questions:
                </p>
                <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                  {preloadedQAs.map((qa, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(qa)}
                      className="text-xs text-left h-auto py-2 px-3 justify-start border-primary/30 hover:bg-primary/5"
                      disabled={isTyping}
                    >
                      {qa.question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;
