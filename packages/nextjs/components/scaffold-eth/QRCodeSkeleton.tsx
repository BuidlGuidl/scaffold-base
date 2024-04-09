import React from "react";

const QrCodeSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-xl w-60 h-60" />
      </div>
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-xl w-60 h-8" />
      </div>
    </div>
  );
};

export default QrCodeSkeleton;
