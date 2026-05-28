/* eslint-disable @next/next/no-img-element */
"use client";

export const WalletConnected = ({
  address,
  icon,
}: {
  address: string | undefined;
  icon: string | undefined;
}) => {
  const formatAddress = (address: string | undefined) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <span className="flex items-center gap-1">
      <span className="h-6 w-6 overflow-hidden rounded-full">
        <img src={icon} alt="Icon" className="h-full w-full object-cover" />
      </span>
      <span>{formatAddress(address)}</span>
    </span>
  );
};
