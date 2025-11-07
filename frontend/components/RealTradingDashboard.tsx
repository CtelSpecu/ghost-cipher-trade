"use client";

import { useState } from "react";

import { useFhevm } from "../fhevm/useFhevm";
import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
import { useFHECounter } from "@/hooks/useFHECounter";
import { errorNotDeployed } from "./ErrorNotDeployed";

type TradeType = "buy" | "sell";

interface Trade {
  id: string;
  amount: number;
  time: string;
  type: TradeType;
}

export function RealTradingDashboard() {
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    provider,
    chainId,
    accounts,
    isConnected,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
    initialMockChains,
  } = useMetaMaskEthersSigner();

  const {
    instance: fhevmInstance,
    status: fhevmStatus,
    error: fhevmError,
  } = useFhevm({
    provider,
    chainId,
    initialMockChains,
    enabled: true,
  });

  const fheCounter = useFHECounter({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    eip1193Provider: provider,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  });

  const [trades, setTrades] = useState<Trade[]>([]);

  if (fhevmError || fheCounter.isDeployed === false) {
    return errorNotDeployed(chainId);
  }

  const netExposure =
    fheCounter.isDecrypted && fheCounter.clear !== undefined
      ? Number(fheCounter.clear)
      : undefined;

  const activeTrades = trades.length;
  const hiddenProfit =
    netExposure === undefined ? "Encrypted" : `${netExposure.toFixed(4)} ETH`;

  const sessionRank = "N/A"; // No real ranking data on-chain

  const handleTrade = async (type: TradeType) => {
    if (!fheCounter.canIncOrDec) return;

    const value = type === "buy" ? 1 : -1;
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const trade: Trade = {
      id: `TX-${Date.now()}`,
      amount: value,
      time: now,
      type,
    };

    setTrades((prev) => [trade, ...prev]);
    fheCounter.incOrDec(value);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {fheCounter.isDecrypted
              ? "SESSION DATA DECRYPTED"
              : "STEALTH MODE ACTIVE"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleTrade("buy")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-teal px-4 py-2 rounded-md text-sm"
            disabled={!fheCounter.canIncOrDec}
          >
            Buy +1
          </button>
          <button
            onClick={() => handleTrade("sell")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-magenta px-4 py-2 rounded-md text-sm"
            disabled={!fheCounter.canIncOrDec}
          >
            Sell -1
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active trades */}
        <div className="holographic-panel p-6 rounded-xl relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Trades</p>
              <p className="text-3xl font-bold text-glow-teal text-secondary relative z-10">
                {activeTrades}
              </p>
            </div>
          </div>
        </div>

        {/* Profit (revealed after decrypt) */}
        <div className="holographic-panel p-6 rounded-xl relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Profit</p>
              <p className="text-3xl font-bold text-glow-magenta text-primary relative z-10">
                {hiddenProfit}
              </p>
            </div>
          </div>
        </div>

        {/* FHEVM status */}
        <div className="holographic-panel p-6 rounded-xl relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">FHEVM Status</p>
              <p className="text-xl font-semibold text-accent relative z-10">
                {fhevmStatus}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Network:
                {" "}
                {chainId === 31337
                  ? "Hardhat Local"
                  : chainId === 11155111
                  ? "Sepolia"
                  : chainId
                  ? `Chain ${chainId}`
                  : "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Engine / Wallet Status + Decrypt Controls */}
      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        {/* Encrypted Trading Session */}
        <div className="h-full">
          <div className="holographic-panel p-6 rounded-xl h-full flex flex-col">
            <h2 className="text-lg font-bold mb-2">Encrypted Trading Session</h2>
            <p className="text-sm text-muted-foreground">
              Place trades without revealing your position on-chain. The FHE-enabled
              smart contract maintains an encrypted net exposure value that only
              you can decrypt locally.
            </p>

            <div className="grid gap-4 md:grid-cols-3 pt-4 mt-auto">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Net Exposure
                </div>
                <div className="text-3xl text-primary font-bold">
                  {netExposure !== undefined ? netExposure : "•••"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Clear value (local)
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={fheCounter.decryptCountHandle}
                    disabled={!fheCounter.canDecrypt}
                    className="text-xs px-3 py-1 rounded border border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reveal net exposure
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Exposure State
                </div>
                <div className="text-xl text-secondary font-bold">
                  {netExposure === undefined
                    ? "Encrypted"
                    : netExposure > 0
                    ? "Net Long"
                    : netExposure < 0
                    ? "Net Short"
                    : "Flat"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Derived from encrypted counter
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Network
                </div>
                <div className="text-xl text-accent font-bold truncate">
                  {chainId === 31337
                    ? "Hardhat Local"
                    : chainId === 11155111
                    ? "Sepolia"
                    : chainId
                    ? `Chain ${chainId}`
                    : "Unknown"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Switch network via wallet
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engine Status */}
        <aside className="holographic-panel p-6 rounded-xl space-y-3 h-full flex flex-col">
          <h2 className="text-lg font-bold">Engine Status</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>FHEVM</span>
              <span className="text-xs text-muted-foreground">{fhevmStatus}</span>
            </li>
            <li className="flex justify-between">
              <span>Decryption</span>
              <span className="text-xs text-muted-foreground">
                {fheCounter.isDecrypting ? "Running" : "Idle"}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Refresh</span>
              <span className="text-xs text-muted-foreground">
                {fheCounter.isRefreshing ? "In progress" : "Idle"}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Transactions</span>
              <span className="text-xs text-muted-foreground">
                {fheCounter.isIncOrDec ? "Pending" : "Idle"}
              </span>
            </li>
          </ul>

          {fheCounter.message && (
            <div className="mt-4 text-xs text-muted-foreground">
              {fheCounter.message}
            </div>
          )}
        </aside>

        {/* Encrypted Trade Controls full width */}
        <div className="holographic-panel p-6 rounded-xl space-y-4 lg:col-span-2">
          <h2 className="text-lg font-bold">Encrypted Trade Controls</h2>
          <p className="text-sm text-muted-foreground">
            Trade size is encrypted in the browser, then processed by the
            FHE-enabled contract. Only the resulting handle leaves your device.
          </p>

          <div className="grid gap-4 md:grid-cols-2 pt-2">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Wallet</span>
                <span className="text-xs text-muted-foreground">
                  {isConnected && accounts && accounts.length > 0
                    ? `${accounts[0].slice(0, 6)}…${accounts[0].slice(-4)}`
                    : "Not connected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">FHEVM Status</span>
                <span className="text-xs text-muted-foreground">
                  {fhevmStatus}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium">Contract Address</span>
                <code className="text-xs break-all bg-background/60 border border-border/60 rounded px-2 py-1">
                  {fheCounter.contractAddress ??
                    "Deployment not found for this chain"}
                </code>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <button
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm"
                disabled={!fheCounter.canDecrypt}
                onClick={fheCounter.decryptCountHandle}
              >
                Reveal Current Net Exposure
              </button>
              <p className="text-xs text-muted-foreground">
                Each action encrypts the trade size in your browser using the
                FHEVM SDK and sends only encrypted data to the contract.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-sm mb-1">Raw Encrypted Handle</h3>
            <code className="block text-xs break-all bg-background/60 border border-border/60 rounded px-2 py-2">
              {fheCounter.handle ?? "No handle fetched yet"}
            </code>
          </div>
        </div>
      </div>

      {/* Trading Feed */}
      <div className="holographic-panel p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-glow-teal text-secondary">
            {fheCounter.isDecrypted
              ? "Decrypted Transaction History"
              : "Encrypted Transactions"}
          </h2>
          <div className="text-sm text-muted-foreground">
            {fheCounter.isDecrypted ? "VISIBLE" : "STEALTH MODE ACTIVE"}
          </div>
        </div>

        <div className="space-y-3">
          {trades.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No trades yet. Use Buy/Sell controls to begin.
            </div>
          ) : (
            trades.map((trade) => (
              <div
                key={trade.id}
                className={`flex items-center justify-between p-4 bg-card/50 border rounded transition-all ${
                  trade.type === "buy"
                    ? "border-secondary/40"
                    : "border-primary/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm">{trade.id}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          trade.type === "buy"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {trade.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{trade.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg">
                    {fheCounter.isDecrypted
                      ? `${trade.amount > 0 ? `+${trade.amount}` : trade.amount} units`
                      : "••• units"}
                  </p>
                  <p className="text-xs uppercase text-muted-foreground">
                    {fheCounter.isDecrypted ? "clear (local)" : "encrypted"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
