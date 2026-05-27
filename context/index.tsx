// // context/index.tsx
// "use client";

// import { wagmiAdapter, projectId } from "@/config/config";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { createAppKit } from "@reown/appkit/react";
// import { sepolia } from "@reown/appkit/networks";
// import React, { type ReactNode } from "react";
// import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// // Set up queryClient
// const queryClient = new QueryClient();

// if (!projectId) {
//   throw new Error("Project ID is not defined");
// }

// // Set up metadata
// const metadata = {
//   name: "Agro Vest",
//   description: "AppKit Example",
//   url: "https://reown.com/appkit", // origin must match your domain & subdomain
//   icons: ["https://assets.reown.com/reown-profile-pic.png"],
// };

// // Create the modal
// const modal = createAppKit({
//   adapters: [wagmiAdapter],
//   projectId,
//   networks: [sepolia],
//   defaultNetwork: sepolia,
//   metadata: metadata,
//   features: {
//     analytics: true, // Optional - defaults to your Cloud configuration
//   },
// });

// function ContextProvider({
//   children,
//   cookies,
// }: {
//   children: ReactNode;
//   cookies: string | null;
// }) {
//   const initialState = cookieToInitialState(
//     wagmiAdapter.wagmiConfig as Config,
//     cookies
//   );

//   return (
//     <WagmiProvider
//       config={wagmiAdapter.wagmiConfig as Config}
//       initialState={initialState}
//     >
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   );
// }

// export default ContextProvider;

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { sepolia } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { projectId, wagmiAdapter, crossfi } from "@/config/config";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "appkit-example",
  description: "AppKit Example",
  url: "https://appkitexampleapp.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [sepolia, crossfi],
  defaultNetwork: crossfi,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    swaps: true,
    onramp: true,
    connectMethodsOrder: ["email", "social", "wallet"],
  },
  themeVariables: {
    "--w3m-accent": "#D2FE75'",
    "--w3m-border-radius-master": "1px",
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
