/* eslint-disable @typescript-eslint/no-unused-vars */
// import {
//   ConnectWallet,
//   Wallet,
//   WalletDropdown,
//   WalletDropdownDisconnect,
// } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export function WalletComponents() {
  const router = useRouter();

  const { status } = useAccount();
  useEffect(() => {
    if (status === "connected") {
      router.push("/user");
    } else {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex justify-end">
      <appkit-button />
    </div>
  );
}
