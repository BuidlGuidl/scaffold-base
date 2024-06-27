"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface Review {
  buyerAddress: string;
  comment: string;
}
interface Product {
  id: string;
  name: string;
  priceInETH: bigint;
  priceInToken: bigint;
}

interface ProductReview {
  productId: string;
  name: string;
  image: string;
  attestationUID: string;
  reviews: Review[];
}

const mockAllProductReviews: ProductReview[] = [
  {
    attestationUID: "0x0d455486a3dadeacfba5f340fe5bf84d1f6678b2e2af53536acc8a4274626f82",
    productId: "1",
    name: "Coin Cap",
    image: "/coin-cap.png",
    reviews: [
      {
        buyerAddress: "0x3240707d60E033230dC736a8022B17f04F95A564",
        comment: "This is a great product!",
      },
      { buyerAddress: "0x80550a82Ba8F733399Ce35d0D14a765aD16Ddde7", comment: "Love my coin cap!" },
    ],
  },
  {
    attestationUID: "0x0d455486a3dadeacfba5f340fe5bf84d1f6678b2e2af53536acc8a4274626f82",
    productId: "2",
    name: "Bitcoin Hoodie",
    image: "/bitcoin-hoodie.png",
    reviews: [
      { buyerAddress: "0x3240707d60E033230dC736a8022B17f04F95A564", comment: "I rep Bitcoin!" },
      { buyerAddress: "0x80550a82Ba8F733399Ce35d0D14a765aD16Ddde7", comment: "Love my hoodie!" },
    ],
  },
];

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Coin Cap",
    priceInETH: 1000000000000000n,
    priceInToken: 1000000000000000000n,
  },
  {
    id: "2",
    name: "Bitcoin Hoodie",
    priceInETH: 2000000000000000n,
    priceInToken: 2000000000000000000n,
  },
];

const ProductReviews: NextPage = () => {
  const [productReviews, setProductReviews] = useState<ProductReview[]>(mockAllProductReviews);

  const { data: allProductReviews, isLoading: isProductReviewsLoading } = useScaffoldReadContract({
    contractName: "TrustScriptShop",
    functionName: "getAllProductReviews",
  });

  useEffect(() => {
    if (allProductReviews) {
      // Assuming `allProductReviews` is in the same format as `mockAllProductReviews`
      const newReviews = (allProductReviews as unknown as ProductReview[]).filter(
        (newReview: { attestationUID: string }) =>
          !productReviews.some(existingReview => existingReview.attestationUID === newReview.attestationUID),
      );
      if (newReviews.length > 0) {
        setProductReviews(prevReviews => [...prevReviews, ...(newReviews as ProductReview[])]);
      }
    }
  }, [allProductReviews, productReviews]);

  if (isProductReviewsLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const productReviewData = productReviews
    .map(review => {
      const product = mockProducts.find(p => p.id === review.productId);
      return product ? { review, product } : null;
    })
    .filter((item): item is { review: ProductReview; product: Product } => item !== null);

  return (
    <div className="flex flex-col py-8 px-4 lg:px-8 lg:py-12 justify-center items-center min-h-full">
      <h1 className="text-4xl font-bold mb-8">Product Reviews</h1>
      {productReviewData.length > 0 ? (
        productReviewData.map(({ review, product }, index) => (
          <div key={index} className="bg-base-100 shadow-xl rounded-box p-4 mb-4 w-full max-w-2xl">
            <div className="flex items-center mb-4">
              <Image src={`/merch/${product.name}.png`} alt={product.name} width={60} height={60} className="mr-4" />
              <h2 className="text-2xl font-semibold">{product.name}</h2>
            </div>
            {review.reviews.map((r, i) => (
              <div key={i} className="mb-2 flex items-center">
                <span className="text-gray-600 mr-2">
                  <Address address={r.buyerAddress} />
                </span>
                <span>
                  <strong>said:</strong> {r.comment}
                </span>
                <a
                  href={`https://base-sepolia.easscan.org/attestation/view/${review.attestationUID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-500 cursor-pointer"
                >
                  🔍
                </a>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ProductReviews;
