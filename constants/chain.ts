export const SUPPORTED_CHAIN_ID = 11155111;

export const isSupportedChain = (
  chainId: number | undefined
): chainId is number =>
  chainId !== undefined && Number(chainId) === SUPPORTED_CHAIN_ID;

//11155111 for eth sepolia
