import { Wallet, WalletDetailsParams } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "viem/chains";
import { createConnector } from "wagmi";
import { coinbaseWallet as coinbaseWagmiWallet } from "wagmi/connectors";

const coinbaseWalletIconBase64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjMkM1RkY2Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjMuOEMxOS40MTI0IDIzLjggMjMuOCAxOS40MTI0IDIzLjggMTRDMjMuOCA4LjU4NzYxIDE5LjQxMjQgNC4yIDE0IDQuMkM4LjU4NzYxIDQuMiA0LjIgOC41ODc2MSA0LjIgMTRDNC4yIDE5LjQxMjQgOC41ODc2MSAyMy44IDE0IDIzLjhaTTExLjU1IDEwLjhDMTEuMTM1OCAxMC44IDEwLjggMTEuMTM1OCAxMC44IDExLjU1VjE2LjQ1QzEwLjggMTYuODY0MiAxMS4xMzU4IDE3LjIgMTEuNTUgMTcuMkgxNi40NUMxNi44NjQyIDE3LjIgMTcuMiAxNi44NjQyIDE3LjIgMTYuNDVWMTEuNTVDMTcuMiAxMS4xMzU4IDE2Ljg2NDIgMTAuOCAxNi40NSAxMC44SDExLjU1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";

/**
 * Coinbase beta SDK connector for rainbow as wallet
 */
export const coinbaseSdkWallet = (): Wallet => ({
  id: "coinbaseSmartWallet",
  name: "Smart Wallet (base sepolia)",
  shortName: "Smart Wallet (base sepolia)",
  iconUrl: coinbaseWalletIconBase64,
  iconAccent: "#2c5ff6",
  iconBackground: "#2c5ff6",
  createConnector: (walletDetails: WalletDetailsParams) =>
    createConnector(config => ({
      ...coinbaseWagmiWallet({
        appName: "Scaffold-ETH 2",
        smartWalletOnly: true,
        chainId: baseSepolia.id,
      })(config),
      ...walletDetails,
    })),
});
