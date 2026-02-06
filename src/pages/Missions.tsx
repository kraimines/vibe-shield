import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import { Target, CheckCircle, Clock, Zap, Star, Gift, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dailyMissions = [
  { id: 1, text: "Post something supportive", xp: 50, done: true },
  { id: 2, text: "Rewrite 1 toxic sentence", xp: 75, done: true },
  { id: 3, text: "Avoid hate content for 24h", xp: 100, done: false },
];

const weeklyMissions = [
  { id: 4, text: "Stay above 80% kindness score for 7 days", xp: 300, progress: 5, total: 7, done: false },
  { id: 5, text: "Get 20 likes on positive comments", xp: 200, progress: 14, total: 20, done: false },
  { id: 6, text: "Join a mental health discussion", xp: 150, progress: 1, total: 1, done: true },
];

const streaks = [
  { days: 3, reward: "Small XP Boost", unlocked: true },
  { days: 7, reward: "Mystery Box 📦", unlocked: true },
  { days: 14, reward: "Rare Frame", unlocked: false },
  { days: 30, reward: "Legendary Badge 👑", unlocked: false },
];

export default function Missions() {
  const [showBox, setShowBox] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <FadeIn>
        <div className="flex items-center gap-3">
          <Target className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Missions</h1>
            <p className="text-muted-foreground text-sm">Complete missions. Earn XP. Open mystery boxes. 🎮</p>
          </div>
        </div>
      </FadeIn>

      {/* Daily Missions */}
      <FadeIn delay={0.05}>
        <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-primary" /> Daily Missions
        </h2>
        <div className="space-y-2">
          {dailyMissions.map((m) => (
            <GlassCard key={m.id} className={cn("flex items-center gap-3 py-3", m.done && "opacity-60")}>
              <CheckCircle className={cn("w-5 h-5 shrink-0", m.done ? "text-success" : "text-muted-foreground")} />
              <span className={cn("flex-1 text-sm", m.done && "line-through")}>{m.text}</span>
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary">+{m.xp} XP</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </FadeIn>

      {/* Weekly Missions */}
      <FadeIn delay={0.1}>
        <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-neon-purple" /> Weekly Missions
        </h2>
        <div className="space-y-2">
          {weeklyMissions.map((m) => (
            <GlassCard key={m.id} className={cn("py-3", m.done && "opacity-60")}>
              <div className="flex items-center gap-3">
                <CheckCircle className={cn("w-5 h-5 shrink-0", m.done ? "text-success" : "text-muted-foreground")} />
                <span className={cn("flex-1 text-sm", m.done && "line-through")}>{m.text}</span>
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-neon-purple" />
                  <span className="text-xs font-bold text-neon-purple">+{m.xp} XP</span>
                </div>
              </div>
              {!m.done && m.progress !== undefined && (
                <div className="mt-2 ml-8">
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-neon-purple to-primary h-1.5 rounded-full" style={{ width: `${(m.progress / m.total!) * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{m.progress}/{m.total}</p>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </FadeIn>

      {/* Streak Tracker */}
      <FadeIn delay={0.15}>
        <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-accent" /> Streak Rewards
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {streaks.map((s) => (
            <GlassCard key={s.days} className={cn("text-center", !s.unlocked && "opacity-40")}>
              <p className="text-2xl font-display font-bold">{s.days}</p>
              <p className="text-[10px] text-muted-foreground">day streak</p>
              <p className="text-xs font-medium mt-2">{s.reward}</p>
              {s.unlocked && <span className="text-[10px] text-success">✓ Unlocked</span>}
            </GlassCard>
          ))}
        </div>
      </FadeIn>

      {/* Mystery Box */}
      <FadeIn delay={0.2}>
        <GlassCard glow="pink" className="text-center">
          <h2 className="text-lg font-display font-semibold mb-2">Mystery Box 📦</h2>
          <p className="text-sm text-muted-foreground mb-4">Complete 5 missions to unlock a mystery box!</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">3/5 missions</span>
            <div className="w-32 bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-accent to-neon-purple h-2 rounded-full" style={{ width: "60%" }} />
            </div>
          </div>
          <Button variant="accent" disabled>Open Box 🎁</Button>
        </GlassCard>
      </FadeIn>

      {/* Box Opening Animation */}
      <AnimatePresence>
        {showBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => { setShowBox(false); setBoxOpened(false); }}
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: 0 }}
              animate={boxOpened ? { scale: 1, rotateY: 360 } : { scale: 1 }}
              className="glass rounded-2xl p-8 max-w-sm w-full text-center glow-pink"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">{boxOpened ? "🎉" : "📦"}</div>
              {boxOpened ? (
                <>
                  <h3 className="text-xl font-display font-bold mb-2">You got a Rare Item! 🔥</h3>
                  <p className="text-neon-purple font-semibold">+500 XP Boost</p>
                  <p className="text-xs text-muted-foreground mt-1">That's a clean drop fr 💯</p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-display font-bold mb-4">Open Your Mystery Box</h3>
                  <Button variant="hero" onClick={() => setBoxOpened(true)}>Open! 🎁</Button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
