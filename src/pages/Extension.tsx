import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import { Shield, Wifi, WifiOff, Scan, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const steps = [
  "Install the VibeGuard Chrome Extension from the Chrome Web Store",
  "Click the VibeGuard icon in your browser toolbar",
  "Sign in with your VibeGuard account",
  "Grant permissions to analyze page content",
  "You're all set! The extension will start protecting your feed 🛡️",
];

export default function Extension() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
      <FadeIn>
        <div className="flex items-center gap-3">
          <Shield className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Chrome Extension</h1>
            <p className="text-muted-foreground text-sm">Connect your browser for real-time protection</p>
          </div>
        </div>
      </FadeIn>

      {/* Connection Status */}
      <FadeIn delay={0.05}>
        <GlassCard glow={connected ? "cyan" : undefined} className="flex items-center gap-4">
          {connected ? <Wifi className="w-8 h-8 text-success" /> : <WifiOff className="w-8 h-8 text-muted-foreground" />}
          <div className="flex-1">
            <p className="font-display font-semibold">{connected ? "Connected" : "Not Connected"}</p>
            <p className="text-xs text-muted-foreground">{connected ? "Extension is actively protecting you" : "Connect your extension to get started"}</p>
          </div>
          <Button variant={connected ? "outline" : "hero"} onClick={() => setConnected(!connected)}>
            {connected ? "Disconnect" : "Connect Extension"}
          </Button>
        </GlassCard>
      </FadeIn>

      {/* Extension Stats */}
      {connected && (
        <FadeIn delay={0.1}>
          <div className="grid sm:grid-cols-3 gap-4">
            <GlassCard className="text-center">
              <AlertTriangle className="w-6 h-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-display font-bold">23</p>
              <p className="text-xs text-muted-foreground">Toxic comments detected today</p>
            </GlassCard>
            <GlassCard className="text-center">
              <Scan className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-display font-bold">142</p>
              <p className="text-xs text-muted-foreground">Posts analyzed today</p>
            </GlassCard>
            <GlassCard className="text-center">
              <Eye className="w-6 h-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-display font-bold">18</p>
              <p className="text-xs text-muted-foreground">Toxicity avoided count</p>
            </GlassCard>
          </div>
        </FadeIn>
      )}

      {/* Setup Steps */}
      <FadeIn delay={0.15}>
        <h2 className="text-lg font-display font-semibold mb-4">How to Connect</h2>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <GlassCard key={i} className="flex items-center gap-3 py-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </div>
              <p className="text-sm">{step}</p>
            </GlassCard>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
