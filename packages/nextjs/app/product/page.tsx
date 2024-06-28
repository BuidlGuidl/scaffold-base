"use client";

import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import type { NextPage } from "next";
import { useSigner } from "~~/utils/eas-wagmi-utils";

const Product: NextPage = () => {
  const signer = useSigner();

  const attestProductReview = async () => {
    const easContractAddress = "0x4200000000000000000000000000000000000021";
    const schemaUID = "0x9f6f2eb2bddf3726a58b6254b697ab24b3527fdaabc01a65765ede0d10ddabc7";
    const eas = new EAS(easContractAddress);

    // Signer must be an ethers-like signer.
    if (signer) {
      eas.connect(signer);
      // Initialize SchemaEncoder with the schema string
      const schemaEncoder = new SchemaEncoder("bytes32 productId,string review,bool liked");
      const encodedData = schemaEncoder.encodeData([
        {
          name: "productId",
          value: "0x3100000000000000000000000000000000000000000000000000000000000000",
          type: "bytes32",
        },
        { name: "review", value: "bla bla bla...", type: "string" },
        { name: "liked", value: true, type: "bool" },
      ]);
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: "0xe84680C37f320c56d9F26E549155D33Bd412e7E3",
          expirationTime: 0n,
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });
      const newAttestationUID = await tx.wait();
      console.log("New attestation UID:", newAttestationUID);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="pt-10" data-tip="Attest Product Provenance">
          <button className="btn btn-secondary btn-sm px-2 rounded-full" onClick={() => attestProductReview()}>
            Attest Product Provenance
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
