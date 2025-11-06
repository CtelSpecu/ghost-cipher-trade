"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="border border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary glow-teal px-4 py-2 rounded-md text-sm flex items-center gap-2"
                  >
                    <span>Connect Wallet</span>
                  </button>
                );
              }

              if (chain?.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className="border border-secondary/50 px-3 py-1 rounded-md text-xs flex items-center gap-2"
                  >
                    {chain?.hasIcon && chain.iconUrl && (
                      <span
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          style={{ width: 16, height: 16 }}
                        />
                      </span>
                    )}
                    <span>{chain?.name}</span>
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 glow-magenta px-4 py-2 rounded-md text-sm font-mono"
                  >
                    {account?.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
