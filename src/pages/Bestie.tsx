import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle, Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "bestie"; content: string };

const starterPrompts = [
  "I'm feeling frustrated about something online",
  "Someone said something hurtful to me",
  "I want to talk about a tough moment",
  "Help me rephrase something I want to say",
];

const bestieResponses: Record<string, string> = {
  default: "That looked like a tough moment. What were you feeling when that happened? I'm here to listen, no judgment.",
  frustrated: "I get why you'd feel frustrated. That's a really valid feeling. Want to talk through what happened? Sometimes it helps to get it out.",
  hurtful: "I'm sorry you went through that. No one deserves to be hurt by words. How are you feeling right now?",
  tough: "Tough moments are hard, but you're here thinking about it — that already shows growth. What's on your mind?",
  rephrase: "Of course! Paste the message you want to rework, and we'll find a way to say it that feels true to you but kinder.",
};

export default function Bestie() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bestie", content: "Hey there! I'm your bestie — a friendly AI here to help you navigate tough online moments. What's on your mind?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    
    // Simple keyword matching for demo
    let response = bestieResponses.default;
    if (text.toLowerCase().includes("frustrat")) response = bestieResponses.frustrated;
    else if (text.toLowerCase().includes("hurt")) response = bestieResponses.hurtful;
    else if (text.toLowerCase().includes("tough")) response = bestieResponses.tough;
    else if (text.toLowerCase().includes("rephrase") || text.toLowerCase().includes("rewrite")) response = bestieResponses.rephrase;

    const bestieMsg: Message = { role: "bestie", content: response };
    setMessages((prev) => [...prev, userMsg, bestieMsg]);
    setInput("");
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <FadeIn>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Bestie AI</h1>
            <p className="text-muted-foreground text-xs">Your supportive friend for tough online moments</p>
          </div>
        </div>
      </FadeIn>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, i) => (
          <FadeIn key={i} delay={0}>
            <div className={cn("flex gap-3", msg.role === "user" && "justify-end")}>
              {msg.role === "bestie" && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "bestie"
                    ? "bg-card border border-border soft-shadow"
                    : "bg-primary/10 text-foreground border border-primary/10"
                )}
              >
                {msg.content}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Starter prompts */}
      {messages.length <= 1 && (
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-4">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="px-3 py-2 rounded-xl text-xs font-medium bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-muted-foreground hover:text-foreground"
              >
                <Sparkles className="w-3 h-3 inline mr-1.5 text-primary" />
                {prompt}
              </button>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Input */}
      <GlassCard className="flex items-center gap-3 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Type something... I'm listening"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <Button size="sm" variant="hero" onClick={() => sendMessage(input)} disabled={!input.trim()}>
          <Send className="w-3.5 h-3.5" />
        </Button>
      </GlassCard>
    </div>
  );
}
