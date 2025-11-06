"use client";

import { useFhevm } from "../fhevm/useFhevm";
import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
import { useFHECounter } from "@/hooks/useFHECounter";
import { errorNotDeployed } from "./ErrorNotDeployed";

/*
 * Encrypted trading dashboard built on top of the FHECounter contract.
 * The encrypted counter is interpreted as a net trading exposure:
 *  - Positive value: net long exposure.
 *  - Negative value: net short exposure.
 * All operations happen on encrypted data on-chain and are only decrypted locally.
 */
export const FHECounterDemo = () => {
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

  if (fhevmError || fheCounter.isDeployed === false) {
    return errorNotDeployed(chainId);
  }

  const netExposure =
    fheCounter.isDecrypted && fheCounter.clear !== undefined
      ? Number(fheCounter.clear)
      : undefined;

  const exposureLabel =
    netExposure === undefined
      ? "Encrypted"
      : netExposure > 0
      ? "Net Long"
      : netExposure < 0
      ? "Net Short"
      : "Flat";

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_minmax(260px,0.9fr)] items-start">
        <div className="space-y-4">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <h1 className="card-title text-2xl lg:text-3xl">
                Encrypted Trading Session
              </h1>
              <p className="text-sm text-base-content/70">
                Place trades without revealing your position on-chain. The
                FHE-enabled smart contract maintains an encrypted net exposure
                value that only you can decrypt locally.
              </p>

              <div className="grid gap-4 md:grid-cols-3 pt-4">
                <div className="stat bg-base-200/60 rounded-box">
                  <div className="stat-title text-xs uppercase tracking-wide">
                    Net Exposure
                  </div>
                  <div className="stat-value text-primary text-3xl">
                    {netExposure !== undefined ? netExposure : "•••"}
                  </div>
                  <div className="stat-desc text-xs">Clear value (local)</div>
                </div>
                <div className="stat bg-base-200/60 rounded-box">
                  <div className="stat-title text-xs uppercase tracking-wide">
                    Exposure State
                  </div>
                  <div className="stat-value text-secondary text-xl">
                    {exposureLabel}
                  </div>
                  <div className="stat-desc text-xs">
                    Derived from encrypted counter
                  </div>
                </div>
                <div className="stat bg-base-200/60 rounded-box">
                  <div className="stat-title text-xs uppercase tracking-wide">
                    Network
                  </div>
                  <div className="stat-value text-accent text-xl truncate">
                    {chainId === 31337
                      ? "Hardhat Local"
                      : chainId === 11155111
                      ? "Sepolia"
                      : chainId
                      ? `Chain ${chainId}`
                      : "Unknown"}
                  </div>
                  <div className="stat-desc text-xs">
                    Switch network via wallet
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <h2 className="card-title">Encrypted Trade Controls</h2>
              <p className="text-sm text-base-content/70">
                Trade size is encrypted in the browser, then processed by the
                FHE-enabled contract. Only the resulting handle leaves your
                device.
              </p>

              <div className="grid gap-4 md:grid-cols-2 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Wallet</span>
                    <span className="badge badge-sm badge-outline">
                      {isConnected && accounts && accounts.length > 0
                        ? `${accounts[0].slice(0, 6)}…${accounts[0].slice(-4)}`
                        : "Not connected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">FHEVM Status</span>
                    <span className="badge badge-sm">{fhevmStatus}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Contract Address</span>
                    <code className="text-xs break-all bg-base-200 rounded-box px-2 py-1">
                      {fheCounter.contractAddress ??
                        "Deployment not found for this chain"}
                    </code>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    className="btn btn-primary w-full"
                    disabled={!fheCounter.canDecrypt}
                    onClick={fheCounter.decryptCountHandle}
                  >
                    Reveal Current Net Exposure
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="btn btn-success btn-outline w-full"
                      disabled={!fheCounter.canIncOrDec}
                      onClick={() => fheCounter.incOrDec(+1)}
                    >
                      Buy +1
                    </button>
                    <button
                      className="btn btn-error btn-outline w-full"
                      disabled={!fheCounter.canIncOrDec}
                      onClick={() => fheCounter.incOrDec(-1)}
                    >
                      Sell -1
                    </button>
                  </div>
                  <p className="text-xs text-base-content/60">
                    Each action encrypts the trade size in your browser using
                    the FHEVM SDK and sends only encrypted data to the contract.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-sm mb-1">
                  Raw Encrypted Handle
                </h3>
                <code className="block text-xs break-all bg-base-200 rounded-box px-2 py-2">
                  {fheCounter.handle ?? "No handle fetched yet"}
                </code>
              </div>
            </div>
          </div>
        </div>

        <aside className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body space-y-3">
            <h2 className="card-title text-lg">Engine Status</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>FHEVM</span>
                <span className="badge badge-sm">{fhevmStatus}</span>
              </li>
              <li className="flex justify-between">
                <span>Decryption</span>
                <span className="badge badge-sm badge-outline">
                  {fheCounter.isDecrypting ? "Running" : "Idle"}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Refresh</span>
                <span className="badge badge-sm badge-outline">
                  {fheCounter.isRefreshing ? "In progress" : "Idle"}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Transactions</span>
                <span className="badge badge-sm badge-outline">
                  {fheCounter.isIncOrDec ? "Pending" : "Idle"}
                </span>
              </li>
            </ul>

            {fheCounter.message && (
              <div className="alert alert-info mt-4 text-xs">
                <span>{fheCounter.message}</span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
