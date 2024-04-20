export const CONTRACTS: {
  [key: string]: {
    aiApp: `0x${string}` | undefined;
    usdToken: `0x${string}` | undefined;
    entryPoint: `0x${string}` | undefined;
    accountFactory: `0x${string}` | undefined;
    paymaster: `0x${string}` | undefined;
  };
} = {
  arbitrumSepolia: {
    aiApp: "0xe05B06f086BE56C22A4cc70708f95d28ca9A8320",
    usdToken: "0x63a465e2C7Ca890430f81B7cE8Ad86bc9A4512DD",
    entryPoint: "0xcee8564039B5620b847E91866e54d2DE3fCD10a0",
    accountFactory: "0xc254cDd94b834966DB91e99bb6aE073Df3F55Bd7",
    paymaster: "0x0702Ae9aff3031a242233F01F1FB35b03AF18a50",
  },
};
