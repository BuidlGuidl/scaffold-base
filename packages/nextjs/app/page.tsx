"use client";

import { ProductCard } from "../components/ProductCard";
import type { NextPage } from "next";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  // const productsTest = [
  //   {
  //     id: "1",
  //     name: "Bitcoin Hoodie",
  //     priceInETH: 0.01,
  //     priceInToken: 0.05,
  //   },
  //   {
  //     id: "2",
  //     name: "Coin Cap",
  //     priceInETH: 0.02,
  //     priceInToken: 0.1,
  //   },
  //   // Add more products as needed
  // ];

  const { data: allProducts, isLoading: isProductsLoading } = useScaffoldReadContract({
    contractName: "TrustScriptShop",
    functionName: "getAllProducts",
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        {isProductsLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <div className="container mx-auto p-4">
            <h1 className="text-5xl font-bold italic mb-4 text-center mb-4 mt-3">Trust Products</h1>
            <div className="flex flex-wrap justify-center gap-4">
              {allProducts?.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
