import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { hardhat, sepolia } from "wagmi/chains";

export const chains = [hardhat, sepolia] as const;

const localUrl =
  process.env.NEXT_PUBLIC_LOCAL_RPC_URL || "http://127.0.0.1:8545";

const sepoliaUrl =
  process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";

export const wagmiConfig = createConfig({
  chains,
  connectors: [injected()],
  transports: {
    [hardhat.id]: http(localUrl),
    [sepolia.id]: http(sepoliaUrl),
  },
  ssr: true,
});

