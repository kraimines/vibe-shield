import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Flag, Send, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "trending" | "new" | "positive" | "mental-health" | "advice";

const filters: { key: FilterType; label: string }[] = [
  { key: "trending", label: "🔥 Trending" },
  { key: "new", label: "✨ New" },
  { key: "positive", label: "💚 Positive Only" },
  { key: "mental-health", label: "🧠 Mental Health" },
  { key: "advice", label: "💡 Advice" },
];

const posts = [
  { id: 1, user: "Maya", avatar: "🧑‍🎤", badge: "Peacekeeper 🕊️", time: "2h ago", text: "Remember: your worth isn't measured by likes. You're amazing just being you 💛", likes: 42, comments: 8, filter: "positive" },
  { id: 2, user: "Jay", avatar: "🧑‍💻", badge: "Kind Soul 🌱", time: "4h ago", text: "Just completed my 30-day streak! The journey map is so addicting fr 🔥", likes: 89, comments: 12, filter: "trending" },
  { id: 3, user: "Sam", avatar: "🎨", badge: "Community Helper 🤝", time: "6h ago", text: "If anyone's going through a tough time, my DMs are open. You're not alone 🫂", likes: 156, comments: 34, filter: "mental-health" },
  { id: 4, user: "Alex", avatar: "🎯", badge: "Newbie Protector 🌱", time: "8h ago", text: "Tip: when you feel like posting something mean, close the app and take 3 deep breaths 😌", likes: 67, comments: 15, filter: "advice" },
];

export default function Community() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("trending");
  const [newPost, setNewPost] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const handlePost = () => {
    const toxicWords = ["hate", "stupid", "ugly", "dumb", "kill"];
    const isToxic = toxicWords.some((w) => newPost.toLowerCase().includes(w));
    if (isToxic) {
      setShowWarning(true);
    } else {
      setNewPost("");
    }
  };

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <FadeIn>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">Community Feed</h1>
        <p className="text-muted-foreground text-sm mt-1">A safe space for real ones 💯</p>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.05}>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                activeFilter === f.key
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "glass text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Create Post */}
      <FadeIn delay={0.1}>
        <GlassCard>
          <textarea
            value={newPost}
            onChange={(e) => { setNewPost(e.target.value); setShowWarning(false); }}
            placeholder="Share something positive... ✨"
            className="w-full bg-transparent text-sm resize-none outline-none min-h-[60px] placeholder:text-muted-foreground"
          />
          {showWarning && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30 mb-3">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Your post may be harmful 💀</p>
                <p className="text-xs text-muted-foreground mt-1">Wanna rewrite it? Here's a suggestion:</p>
                <p className="text-xs text-foreground mt-1 italic">"I feel frustrated right now but I'm working on expressing myself better."</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="default" onClick={() => { setNewPost("I feel frustrated right now but I'm working on expressing myself better."); setShowWarning(false); }}>
                    <Sparkles className="w-3 h-3" /> Use Suggestion
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowWarning(false)}>Edit Myself</Button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button size="sm" variant="hero" onClick={handlePost} disabled={!newPost.trim()}>
              <Send className="w-3.5 h-3.5" /> Post
            </Button>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <FadeIn key={post.id} delay={0.15 + i * 0.05}>
            <GlassCard>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{post.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{post.user}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{post.badge}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4">{post.text}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={cn(
                    "flex items-center gap-1.5 text-xs transition-colors",
                    likedPosts.has(post.id) ? "text-accent" : "text-muted-foreground hover:text-accent"
                  )}
                >
                  <Heart className={cn("w-4 h-4", likedPosts.has(post.id) && "fill-accent")} />
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <MessageSquare className="w-4 h-4" /> {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors ml-auto">
                  <Flag className="w-4 h-4" /> Report
                </button>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
