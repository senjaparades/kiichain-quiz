// types/global.d.ts
export {};

declare global {
  interface EthereumProvider {
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    on?: (event: string, listener: (...args: unknown[]) => void) => void;
    removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
  }

  interface Window {
    ethereum?: EthereumProvider;
  }
}
