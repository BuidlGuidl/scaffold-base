import { useEffect, useMemo, useState } from "react";
import { loadBurnerSK } from "../scaffold-eth";
import { useTargetNetwork } from "../scaffold-eth/useTargetNetwork";
import { LightSmartContractAccount, getDefaultLightAccountFactoryAddress } from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Address, LocalAccountSigner, getDefaultEntryPointAddress } from "@alchemy/aa-core";
import scaffoldConfig from "~~/scaffold.config";

const burnerPK = loadBurnerSK();
const burnerSigner = LocalAccountSigner.privateKeyToAccountSigner(burnerPK);

export const useSmartAccount = () => {
  const [scaAddress, setScaAddress] = useState<Address>();
  const [scaSigner, setScaSigner] = useState<AlchemyProvider>();
  const { targetNetwork: chain } = useTargetNetwork();
  const provider = useMemo(
    () => {
      try {
        return new AlchemyProvider({
          chain: chain,
          apiKey: scaffoldConfig.alchemyApiKey,
          opts: {
            txMaxRetries: 20,
            txRetryIntervalMs: 2_000,
            txRetryMulitplier: 1.2,
          },
        });
      } catch (e) {
        console.error("Error creating AlchemyProvider");
        return undefined;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chain.id],
  );

  useEffect(() => {
    const connectedProvider = provider?.connect(provider => {
      return new LightSmartContractAccount({
        rpcClient: provider,
        owner: burnerSigner,
        chain,
        entryPointAddress: getDefaultEntryPointAddress(chain),
        factoryAddress: getDefaultLightAccountFactoryAddress(chain),
      });
    });
    const getScaAddress = async () => {
      const address = await connectedProvider?.getAddress();
      console.log("🔥 scaAddress", address);
      setScaAddress(address);
    };
    setScaSigner(connectedProvider);
    getScaAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain.id]);

  return { provider, scaSigner, scaAddress };
};
