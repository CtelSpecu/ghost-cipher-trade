// Minimal stub for @react-native-async-storage/async-storage for web/Next.js builds
// This prevents bundler errors when MetaMask SDK (or other libs) try to import it.

export default {
  getItem: async (_key: string): Promise<string | null> => null,
  setItem: async (_key: string, _value: string): Promise<void> => {},
  removeItem: async (_key: string): Promise<void> => {},
  clear: async (): Promise<void> => {},
};
