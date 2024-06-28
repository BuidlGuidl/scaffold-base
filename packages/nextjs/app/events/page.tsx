"use client";

import type { NextPage } from "next";

//import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Events: NextPage = () => {
  // const { data: addProductEvent } = useScaffoldEventHistory({
  //   contractName: "TrustScriptShop",
  //   eventName: "AddProduct",
  //   fromBlock: 0n,
  //   watch: true,
  // });

  // const { data: buyProductWithETHEvent } = useScaffoldEventHistory({
  //   contractName: "TrustScriptShop",
  //   eventName: "BuyProductWithETH",
  //   fromBlock: 0n,
  //   watch: true,
  // });

  // const { data: buyProductWithTokenEvent } = useScaffoldEventHistory({
  //   contractName: "TrustScriptShop",
  //   eventName: "BuyProductWithToken",
  //   fromBlock: 0n,
  //   watch: true,
  // });

  // const { data: reviewProductEvent } = useScaffoldEventHistory({
  //   contractName: "TrustScriptShop",
  //   eventName: "ReviewProduct",
  //   fromBlock: 0n,
  //   watch: true,
  // });

  // const { data: mintTokenToBuyerEvent } = useScaffoldEventHistory({
  //   contractName: "TrustScriptShop",
  //   eventName: "MintTokenToBuyer",
  //   fromBlock: 0n,
  //   watch: true,
  // });

  // const { data: withdrawETHEvent } = useScaffoldEventHistory({
  //   contractName: "TrustScriptShop",
  //   eventName: "WithdrawETH",
  //   fromBlock: 0n,
  //   watch: true,
  // });

  // const { data: withdrawTokenEvent } = useScaffoldEventHistory({
  //   contractName: "TrustScriptShop",
  //   eventName: "WithdrawToken",
  //   fromBlock: 0n,
  //   watch: true,
  // });

  // addProductEvent && console.log(addProductEvent);
  // buyProductWithETHEvent && console.log(buyProductWithETHEvent);
  // buyProductWithTokenEvent && console.log(buyProductWithTokenEvent);
  // reviewProductEvent && console.log(reviewProductEvent);
  // mintTokenToBuyerEvent && console.log(mintTokenToBuyerEvent);
  // withdrawETHEvent && console.log(withdrawETHEvent);
  // withdrawTokenEvent && console.log(withdrawTokenEvent);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">Events</div>
    </>
  );
};

export default Events;
