import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const leaders = [
  { rank: 1, name: "Maya", avatar: "🧑‍🎤", level: 28, title: "Legend 👑", points: 12450, streak: 42 },
  { rank: 2, name: "Jay", avatar: "🧑‍💻", level: 24, title: "Guardian 🛡️", points: 10280, streak: 30 },
  { rank: 3, name: "Sam", avatar: "🎨", level: 22, title: "Peacekeeper 🕊️", points: 9150, streak: 25 },
  { rank: 4, name: "Alex", avatar: "🎯", level: 19, title: "Calm Viber 😌", points: 7800, streak: 18 },
  { rank: 5, name: "Jordan", avatar: "🎸", level: 17, title: "Calm Viber 😌", points: 6540, streak: 14 },
  { rank: 6, name: "Taylor", avatar: "🌺", level: 15, title: "Friendly NPC 👋", points: 5200, streak: 11 },
  { rank: 7, name: "You", avatar: "⭐", level: 12, title: "Kind Soul 🌱", points: 3800, streak: 7 },
  { rank: 8, name: "Morgan", avatar: "🎭", level: 10, title: "Kind Soul 🌱", points: 3200, streak: 5 },
];

type Tab = "weekly" | "monthly" | "alltime";

export default function Leaderboard() {
  const [tab, setTab] = useState<Tab>("weekly");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-warning" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-accent" />;
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <FadeIn>
        <div className="flex items-center gap-3">
          <Trophy className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Leaderboard</h1>
            <p className="text-muted-foreground text-sm">Compete with the cleanest vibes 🏆</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex gap-2">
          {(["weekly", "monthly", "alltime"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all",
                tab === t ? "bg-primary/10 text-primary border border-primary/30" : "glass text-muted-foreground"
              )}
            >
              {t === "alltime" ? "All Time" : t}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Top 3 podium */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-3 gap-3">
          {leaders.slice(0, 3).map((l, i) => (
            <GlassCard key={l.rank} glow={i === 0 ? "cyan" : undefined} className={cn("text-center", i === 0 && "ring-1 ring-primary/30")}>
              <div className="text-3xl mb-2">{l.avatar}</div>
              <p className="font-semibold text-sm">{l.name}</p>
              <p className="text-[10px] text-muted-foreground">{l.title}</p>
              <p className="text-lg font-display font-bold text-primary mt-1">{l.points.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Level {l.level}</p>
            </GlassCard>
          ))}
        </div>
      </FadeIn>

      {/* Rest of leaderboard */}
      <div className="space-y-2">
        {leaders.slice(3).map((l, i) => (
          <FadeIn key={l.rank} delay={0.15 + i * 0.03}>
            <GlassCard className={cn("flex items-center gap-4 py-3", l.name === "You" && "ring-1 ring-primary/30 glow-cyan")}>
              {getRankIcon(l.rank)}
              <div className="text-xl">{l.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{l.name}</span>
                  {l.name === "You" && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">You</span>}
                </div>
                <p className="text-[10px] text-muted-foreground">{l.title} · Level {l.level}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-sm">{l.points.toLocaleString()}</p>
                <div className="flex items-center gap-1 justify-end">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-[10px] text-success">{l.streak}d streak</span>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
