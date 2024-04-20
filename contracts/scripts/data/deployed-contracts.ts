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
  gnosisChiado: {
    aiApp: undefined,
    usdToken: undefined,
    entryPoint: "0x0000000000000000000000000000000000000000",
    accountFactory: "0x0000000000000000000000000000000000000000",
    paymaster: "0x0000000000000000000000000000000000000000",
  },
  filecoinCalibration: {
    aiApp: "0xe720443310986E173af339fA366A30aa0A1Ea5b2",
    usdToken: "0x7e2E43D2078463F277FD9a2815143642b14455cb",
    entryPoint: "0x0000000000000000000000000000000000000000",
    accountFactory: "0x0000000000000000000000000000000000000000",
    paymaster: "0x0000000000000000000000000000000000000000",
  },
};
