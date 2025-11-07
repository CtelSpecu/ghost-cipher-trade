"use client";

import { RealTradingDashboard } from "@/components/RealTradingDashboard";

export default function Home() {
  const handleStartTradingClick = () => {
    if (typeof document === "undefined") return;
    const el = document.getElementById("trading-dashboard");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at center, rgba(244,114,182,0.25), transparent 60%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <div className="text-sm uppercase tracking-widest text-secondary mb-4 animate-pulse">
                Encrypted Trading Protocol
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="text-glow-teal text-secondary">Trade</span>{" "}
                <span className="text-glow-magenta text-primary">Without</span>{" "}
                <span className="text-glow-teal text-secondary">Trace</span>
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Execute encrypted transactions invisible to competitors. Your trades remain
              cloaked until session end. Master privacy-preserving strategies in our
              stealth simulation environment.
            </p>

            <div className="flex items-center justify-center gap-4 pt-8">
              <button
                type="button"
                onClick={handleStartTradingClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-magenta group px-6 py-3 rounded-md text-sm font-medium"
              >
                Start Trading
              </button>
            </div>

            {/* Feature Cards */}
            <section className="container mx-auto px-4 py-20">
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="holographic-panel p-8 text-center space-y-4 rounded-xl">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center glow-magenta">
                    <div className="text-3xl">🔒</div>
                  </div>
                  <h3 className="text-xl font-bold text-primary">100% Encrypted</h3>
                  <p className="text-sm text-muted-foreground">
                    Session data stays encrypted end-to-end until you reveal it locally.
                  </p>
                </div>

                <div className="holographic-panel p-8 text-center space-y-4 rounded-xl">
                  <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center glow-teal">
                    <div className="text-3xl">👻</div>
                  </div>
                  <h3 className="text-xl font-bold text-secondary">Hidden Traders</h3>
                  <p className="text-sm text-muted-foreground">
                    Counterparty order flow and positions remain hidden during the session.
                  </p>
                </div>

                <div className="holographic-panel p-8 text-center space-y-4 rounded-xl">
                  <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                    <div className="text-3xl">📊</div>
                  </div>
                  <h3 className="text-xl font-bold text-accent">Zero Trace</h3>
                  <p className="text-sm text-muted-foreground">
                    No cleartext exposure on-chain before reveal—orders leave only encrypted traces.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section
        id="trading-dashboard"
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-glow-teal text-secondary mb-4">
              Live Trading Terminal
            </h2>
            <p className="text-muted-foreground">
              All data encrypted in real-time • Decryption occurs post-session
            </p>
          </div>

          <RealTradingDashboard />
        </div>
      </section>
    </div>
  );
}

