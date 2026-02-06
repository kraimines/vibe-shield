import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { FadeIn } from "@/components/FadeIn";
import { Shield, ArrowRight } from "lucide-react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <FadeIn>
        <GlassCard glow="pink" className="w-full max-w-sm">
          <div className="flex items-center gap-2 justify-center mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold">VibeGuard</span>
          </div>
          <h1 className="text-xl font-display font-bold text-center mb-2">Join the vibe ✨</h1>
          <p className="text-xs text-muted-foreground text-center mb-6">Create your account and start protecting your peace</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none border border-border focus:border-primary transition-colors"
                placeholder="your_vibe_name"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none border border-border focus:border-primary transition-colors"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none border border-border focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
            <Button variant="hero" className="w-full" type="submit">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
