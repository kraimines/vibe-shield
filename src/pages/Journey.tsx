import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import { Lock, Check, Star, Gift, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stages = [
  { name: "Newbie Protector 🌱", level: 1, unlocked: true, missions: 10, completed: 10 },
  { name: "Kindness Rookie ✨", level: 5, unlocked: true, missions: 10, completed: 10 },
  { name: "Peace Builder 🕊️", level: 10, unlocked: true, missions: 10, completed: 7 },
  { name: "Community Guardian 🛡️", level: 15, unlocked: false, missions: 10, completed: 0 },
  { name: "Anti-Hate Hero 🔥", level: 20, unlocked: false, missions: 10, completed: 0 },
  { name: "Vibe Legend 👑", level: 30, unlocked: false, missions: 10, completed: 0 },
];

const rewards = [
  { name: "Rare Badge: Kind Soul", type: "badge", rarity: "rare", claimed: true },
  { name: "Neon Frame", type: "frame", rarity: "epic", claimed: false },
  { name: "Good Vibes Title", type: "title", rarity: "legendary", claimed: false },
];

const rarityColors: Record<string, string> = {
  rare: "text-primary",
  epic: "text-neon-purple",
  legendary: "text-warning",
};

export default function Journey() {
  const [showReward, setShowReward] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <FadeIn>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">Vibe Journey 🗺️</h1>
        <p className="text-muted-foreground text-sm mt-1">Level up your path to becoming a Vibe Legend</p>
      </FadeIn>

      {/* Journey Map */}
      <div className="relative space-y-4">
        {stages.map((stage, i) => (
          <FadeIn key={stage.name} delay={i * 0.08}>
            <GlassCard
              className={cn(
                "relative transition-all duration-300",
                !stage.unlocked && "opacity-50 blur-[1px]",
                stage.unlocked && stage.completed < stage.missions && "ring-1 ring-primary/30 glow-cyan"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  stage.unlocked ? "bg-primary/10" : "bg-muted"
                )}>
                  {stage.unlocked ? (
                    stage.completed === stage.missions
                      ? <Check className="w-6 h-6 text-success" />
                      : <Star className="w-6 h-6 text-primary" />
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-sm">{stage.name}</h3>
                    <span className="text-[10px] text-muted-foreground">Level {stage.level}</span>
                  </div>
                  {stage.unlocked && (
                    <>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-primary to-neon-pink h-2 rounded-full transition-all"
                          style={{ width: `${(stage.completed / stage.missions) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {stage.completed}/{stage.missions} missions completed
                      </p>
                    </>
                  )}
                </div>
                {stage.unlocked && stage.completed === stage.missions && (
                  <Button size="sm" variant="hero" onClick={() => setShowReward(true)}>
                    <Gift className="w-3.5 h-3.5" /> Claim
                  </Button>
                )}
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      {/* Rewards Section */}
      <FadeIn delay={0.5}>
        <h2 className="text-xl font-display font-bold mb-4">Rewards 🎁</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {rewards.map((r) => (
            <GlassCard key={r.name} className="text-center">
              <Gift className={cn("w-8 h-8 mx-auto mb-2", rarityColors[r.rarity])} />
              <p className="text-sm font-semibold">{r.name}</p>
              <p className={cn("text-[10px] font-medium uppercase mt-1", rarityColors[r.rarity])}>{r.rarity}</p>
              {r.claimed ? (
                <span className="text-[10px] text-success mt-2 block">Claimed ✓</span>
              ) : (
                <Button size="sm" variant="neon" className="mt-2 w-full">Claim Reward</Button>
              )}
            </GlassCard>
          ))}
        </div>
      </FadeIn>

      {/* Reward Popup */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowReward(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-sm w-full text-center glow-cyan"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-display font-bold mb-2">Level up unlocked 🔥</h3>
              <p className="text-sm text-muted-foreground mb-1">Bro you're actually becoming a vibe legend 😭</p>
              <p className="text-lg font-bold text-gradient-primary my-4">You unlocked: Rare Badge</p>
              <Button variant="hero" onClick={() => setShowReward(false)} className="w-full">
                Claim your reward 🎁
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
