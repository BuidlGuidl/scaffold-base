import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { rainbowkitBurnerWallet } from "burner-connector";
import * as chains from "viem/chains";
import scaffoldConfig from "~~/scaffold.config";

const { onlyLocalBurnerWallet, targetNetworks } = scaffoldConfig;

const wallets = [
  metaMaskWallet,
  walletConnectWallet,
  ledgerWallet,
  coinbaseWallet,
  rainbowWallet,
  safeWallet,
  ...(!targetNetworks.some(network => network.id !== (chains.hardhat as chains.Chain).id) || !onlyLocalBurnerWallet
    ? [rainbowkitBurnerWallet]
    : []),
];

type CoinbaseWalletOptions = Parameters<typeof coinbaseWallet>[0];
const coinbaseSmartWalletOnly = (params: CoinbaseWalletOptions) => coinbaseWallet(params);
coinbaseSmartWalletOnly.preference = "smartWalletOnly";

const supportedWalletGroup = { groupName: "Supported Wallets", wallets };
// Show the Smart Wallets group only if Base Sepolia || Base is present in the targetNetworks
const rainbowGroups = (targetNetworks as unknown as chains.Chain[]).some(
  network => network.id === chains.baseSepolia.id || network.id === chains.base.id,
)
  ? [
      { groupName: "Smart Wallets", wallets: [coinbaseSmartWalletOnly] },
      { groupName: "others", wallets },
    ]
  : [supportedWalletGroup];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets(rainbowGroups, {
  appName: "scaffold-eth-2",
  projectId: scaffoldConfig.walletConnectProjectId,
});
