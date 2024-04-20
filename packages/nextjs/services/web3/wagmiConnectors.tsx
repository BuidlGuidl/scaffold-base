import { coinbaseSdkWallet } from "./coinbase-sw-connector/coinbaseSWConnector";
import { burnerWalletConfig } from "./wagmi-burner/burnerWalletConfig";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
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
    ? [burnerWalletConfig]
    : []),
];

const supportedWalletGroup = { groupName: "Supported Wallets", wallets };
// Show the Smart Wallets group only if Base Sepolia is present in the targetNetworks
const rainbowGroups = targetNetworks.some(network => network.id === (chains.baseSepolia as chains.Chain).id)
  ? [{ groupName: "Smart Wallets", wallets: [coinbaseSdkWallet] }, supportedWalletGroup]
  : [supportedWalletGroup];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets(rainbowGroups, {
  appName: "scaffold-eth-2",
  projectId: scaffoldConfig.walletConnectProjectId,
});
