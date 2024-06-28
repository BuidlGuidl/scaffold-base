"use client";

import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";
// import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

// export const metadata = getMetadata({
//   title: "Debug Contracts",
//   description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
// });

const Debug: NextPage = () => {
  const { data: addProductEvent } = useScaffoldEventHistory({
    contractName: "TrustScriptShop",
    eventName: "AddProduct",
    fromBlock: 0n,
    watch: true,
  });

  const { data: buyProductWithETHEvent } = useScaffoldEventHistory({
    contractName: "TrustScriptShop",
    eventName: "BuyProductWithETH",
    fromBlock: 0n,
    watch: true,
  });

  const { data: buyProductWithTokenEvent } = useScaffoldEventHistory({
    contractName: "TrustScriptShop",
    eventName: "BuyProductWithToken",
    fromBlock: 0n,
    watch: true,
  });

  const { data: reviewProductEvent } = useScaffoldEventHistory({
    contractName: "TrustScriptShop",
    eventName: "ReviewProduct",
    fromBlock: 0n,
    watch: true,
  });

  const { data: mintTokenToBuyerEvent } = useScaffoldEventHistory({
    contractName: "TrustScriptShop",
    eventName: "MintTokenToBuyer",
    fromBlock: 0n,
    watch: true,
  });

  const { data: withdrawETHEvent } = useScaffoldEventHistory({
    contractName: "TrustScriptShop",
    eventName: "WithdrawETH",
    fromBlock: 0n,
    watch: true,
  });

  const { data: withdrawTokenEvent } = useScaffoldEventHistory({
    contractName: "TrustScriptShop",
    eventName: "WithdrawToken",
    fromBlock: 0n,
    watch: true,
  });

  addProductEvent && console.log("addProductEvent", addProductEvent);
  buyProductWithETHEvent && console.log("buyProductWithETHEvent", buyProductWithETHEvent);
  buyProductWithTokenEvent && console.log("buyProductWithTokenEvent", buyProductWithTokenEvent);
  reviewProductEvent && console.log("reviewProductEvent", reviewProductEvent);
  mintTokenToBuyerEvent && console.log("mintTokenToBuyerEvent", mintTokenToBuyerEvent);
  withdrawETHEvent && console.log("withdrawETHEvent", withdrawETHEvent);
  withdrawTokenEvent && console.log("withdrawTokenEvent", withdrawTokenEvent);

  return (
    <>
      <DebugContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Debug Contracts</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / debug / page.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default Debug;
