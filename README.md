# 🔐 Ghost Cipher Trade

> **Trade Without Trace** - A privacy-preserving encrypted trading platform powered by Fully Homomorphic Encryption (FHE)

Ghost Cipher Trade is a decentralized application that enables traders to execute encrypted transactions that remain invisible to competitors and observers. Built on Zama's FHEVM protocol, all trading positions are processed entirely in encrypted form on-chain, ensuring complete privacy until the trader chooses to reveal their position.

[![License](https://img.shields.io/badge/License-BSD_3--Clause--Clear-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.4-black)](https://nextjs.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.21-yellow)](https://hardhat.org/)

## 🎥 Demo

### 🌐 Live Demo
**[Try Ghost Cipher Trade Live →](https://ghost-cipher-trade.vercel.app/)**

### 📹 Video Demonstration
Watch the full demonstration of Ghost Cipher Trade in action:

[![Ghost Cipher Trade Demo](https://img.shields.io/badge/▶️-Watch_Demo-red?style=for-the-badge)](./DemoVideo.mp4)

*Download and watch [DemoVideo.mp4](./DemoVideo.mp4) to see the complete walkthrough of encrypted trading features.*

---

## ✨ Features

### 🎯 Core Capabilities

- **🔒 Encrypted Trading**: Execute buy/sell orders with amounts encrypted client-side before submission
- **👻 Zero-Knowledge Positions**: Trading positions remain completely hidden on-chain
- **🔐 Selective Disclosure**: Decrypt and reveal your net exposure only when you choose
- **⚡ Real-Time Updates**: Live trading dashboard with encrypted transaction history
- **🛡️ Privacy-First**: No cleartext exposure on-chain before reveal—orders leave only encrypted traces
- **🔑 Wallet Authentication**: Mandatory signature verification for each decryption operation

### 🎨 User Experience

- **Modern UI**: Sleek, holographic-themed interface with smooth animations
- **Responsive Design**: Fully optimized for desktop and mobile devices
- **Real-Time Feedback**: Live status updates and transaction monitoring
- **MetaMask Integration**: Seamless wallet connection and transaction signing

---

## 🏗️ Architecture

### Smart Contract Layer

```solidity
FHECounter.sol - Encrypted net exposure tracking
├── increment()  - Add encrypted position (buy)
├── decrement()  - Subtract encrypted position (sell)
└── getCount()   - Retrieve encrypted net exposure
```

**Key Features:**
- Per-trader encrypted net exposure storage
- FHE arithmetic operations (add/subtract) in encrypted space
- Access control with FHEVM permission system
- Zero cleartext leakage on-chain

### Frontend Stack

- **Framework**: Next.js 15.4 with React 19
- **Styling**: TailwindCSS + DaisyUI
- **Web3**: Wagmi + RainbowKit + Ethers.js
- **FHE SDK**: @zama-fhe/relayer-sdk
- **State Management**: React Hooks + TanStack Query

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm/pnpm**: Package manager
- **MetaMask**: Browser wallet extension

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ClydeBartholomew/ghost-cipher-trade.git
   cd ghost-cipher-trade
   ```

2. **Install dependencies**

   ```bash
   # Install contract dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**

   ```bash
   # Configure Hardhat variables
   npx hardhat vars set MNEMONIC
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set ETHERSCAN_API_KEY  # Optional
   ```

4. **Compile contracts**

   ```bash
   npm run compile
   ```

5. **Run tests**

   ```bash
   npm run test
   ```

### Local Development

#### Option 1: Local Hardhat Network

```bash
# Terminal 1: Start local FHEVM node
npx hardhat node

# Terminal 2: Deploy contracts
npx hardhat deploy --network localhost

# Terminal 3: Start frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000` to access the application.

#### Option 2: Sepolia Testnet

```bash
# Deploy to Sepolia
npx hardhat deploy --network sepolia

# Verify contract (optional)
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

# Start frontend (configured for Sepolia)
cd frontend
npm run dev
```

---

## 📁 Project Structure

```
ghost-cipher-trade/
├── contracts/                    # Smart contracts
│   └── FHECounter.sol           # Main encrypted counter contract
├── deploy/                      # Deployment scripts
│   └── deploy.ts                # Hardhat deployment configuration
├── tasks/                       # Custom Hardhat tasks
│   ├── FHECounter.ts           # Counter interaction tasks
│   └── accounts.ts             # Account management
├── test/                        # Contract tests
│   ├── FHECounter.ts           # Local network tests
│   └── FHECounterSepolia.ts    # Sepolia testnet tests
├── frontend/                    # Next.js frontend application
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Main landing page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/             # React components
│   │   ├── RealTradingDashboard.tsx  # Main trading interface
│   │   ├── FHECounterDemo.tsx        # Counter demo component
│   │   ├── WalletConnectButton.tsx   # Wallet connection
│   │   └── GhostLogo.tsx             # Logo component
│   ├── hooks/                  # Custom React hooks
│   │   ├── useFHECounter.tsx  # FHE counter logic
│   │   └── metamask/          # MetaMask integration hooks
│   ├── fhevm/                  # FHEVM SDK integration
│   │   ├── useFhevm.tsx       # FHEVM instance management
│   │   ├── FhevmDecryptionSignature.ts  # Signature handling
│   │   └── internal/          # Internal FHEVM utilities
│   ├── abi/                    # Generated contract ABIs
│   ├── lib/                    # Utility libraries
│   └── public/                 # Static assets
├── hardhat.config.ts           # Hardhat configuration
├── package.json                # Contract dependencies
└── README.md                   # This file
```

---

## 🎮 How to Use

### 1. Connect Your Wallet

Click "Connect Wallet" and approve the connection in MetaMask.

### 2. Execute Encrypted Trades

- **Buy +1**: Increment your encrypted net exposure
- **Sell -1**: Decrement your encrypted net exposure

Each trade encrypts the amount client-side using FHEVM SDK before sending to the contract.

### 3. Reveal Your Position

After executing at least one trade:

1. Click "Reveal Current Net Exposure"
2. Approve the signature request in your wallet (required for decryption)
3. View your decrypted net position locally

**Note**: Each reveal operation requires a fresh wallet signature to ensure security.

---

## 🔧 Available Scripts

### Contract Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run compile`     | Compile all smart contracts          |
| `npm run test`        | Run contract tests                   |
| `npm run test:sepolia`| Run tests on Sepolia testnet         |
| `npm run coverage`    | Generate test coverage report        |
| `npm run lint`        | Run linting checks                   |
| `npm run clean`       | Clean build artifacts                |
| `npm run node`        | Start local Hardhat node             |

### Frontend Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server (Turbopack)     |
| `npm run build`   | Build for production                     |
| `npm run start`   | Start production server                  |
| `npm run lint`    | Run ESLint checks                        |
| `npm run genabi`  | Generate ABI files from deployments      |

---

## 🔐 Security Features

### Encryption Flow

1. **Client-Side Encryption**: Trade amounts are encrypted in the browser using FHEVM SDK
2. **On-Chain Processing**: All arithmetic operations occur in encrypted space
3. **Access Control**: Only the trader can decrypt their own positions
4. **Signature Verification**: Each decryption requires fresh wallet signature

### Privacy Guarantees

- ✅ No cleartext amounts visible on-chain
- ✅ No transaction patterns leaked
- ✅ No MEV vulnerability from exposed positions
- ✅ Selective disclosure controlled by trader

---

## 🧪 Testing

### Run All Tests

```bash
# Local tests with mocked FHEVM
npm run test

# Sepolia testnet tests
npm run test:sepolia
```

### Test Coverage

```bash
npm run coverage
```

---

## 🌐 Deployment

### Deploy to Sepolia

```bash
# Deploy contracts
npx hardhat deploy --network sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

### Deploy Frontend

The frontend is configured for deployment on Vercel:

```bash
cd frontend
npm run build
```

Set the **Root Directory** to `frontend` in your Vercel project settings.

---

## 📚 Documentation & Resources

### FHEVM Documentation
- [FHEVM Protocol](https://docs.zama.ai/fhevm)
- [Hardhat Setup Guide](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- [Testing Guide](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)

### Project Resources
- [Smart Contract Source](./contracts/FHECounter.sol)
- [Frontend Documentation](./frontend/README.md)
- [Demo Video](./DemoVideo.mp4)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the **BSD-3-Clause-Clear License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Zama**: For the groundbreaking FHEVM protocol
- **Hardhat**: For the excellent development framework
- **Next.js**: For the powerful React framework
- **RainbowKit**: For seamless wallet integration

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/ClydeBartholomew/ghost-cipher-trade/issues)
- **FHEVM Docs**: [docs.zama.ai](https://docs.zama.ai)
- **Community**: [Zama Discord](https://discord.gg/zama)

---

<div align="center">

**Built with 🔐 for Privacy-Preserving Trading**

*Trade Without Trace*

</div>
