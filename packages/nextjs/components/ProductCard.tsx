import { FC } from "react";
import Image from "next/image";
import { formatEther } from "viem";

interface Product {
  id: bigint;
  name: string;
  priceInETH: bigint;
  priceInToken: bigint;
}

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="card w-80 h-auto bg-base-100 shadow-xl m-4 rounded-lg overflow-hidden">
      <div className="flex items-center justify-center px-2 pt-2">
        <div className="relative w-48 h-48 mb-6">
          <Image
            src={`/merch/${product.name}.png`}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-xl mt-5"
          />
        </div>
      </div>
      <div className="card-body flex flex-col items-center text-center p-4">
        <h2 className="card-title text-2xl font-semibold mb-4">{product.name}</h2>
        <div className="flex flex-col items-center mb-1 space-y-4 w-full">
          <div className="flex items-center justify-between w-full px-14">
            <p className="text-l">{formatEther(product.priceInETH)} ETH</p>
            <button className="btn btn-primary ml-4 px-7">Buy</button>
          </div>

          <div className="flex items-center justify-between w-full px-14">
            <p className="text-l">{formatEther(product.priceInToken)} TST</p>
            <button className="btn btn-primary ml-4 px-7">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};
