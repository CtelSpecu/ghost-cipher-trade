"use client";

import Image from "next/image";

export function GhostLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
          src="/ghost-logo.png"
          alt="Ghost Cipher Trade Logo"
          width={48}
          height={48}
          className="animate-pulse"
        />
        <div className="absolute inset-0 bg-cyber-teal/20 blur-xl animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-glow-magenta text-primary">
          Ghost Cipher Trade
        </span>
        <span className="text-xs text-secondary tracking-wider">
          STEALTH PROTOCOL
        </span>
      </div>
    </div>
  );
}
