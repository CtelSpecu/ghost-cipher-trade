import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { GhostLogo } from "@/components/GhostLogo";

export const metadata: Metadata = {
  title: "Ghost Cipher Trade",
  description: "Encrypted trading dashboard powered by FHEVM",
  icons: {
    icon: "/ghost-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground cyber-grid antialiased">
        <Providers>
          <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <GhostLogo />
              <WalletConnectButton />
            </div>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

