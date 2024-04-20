import {
  Chain,
  arbitrumSepolia,
  filecoinCalibration,
  gnosisChiado,
} from "viem/chains";

export type SiteConfig = typeof siteConfig;

export type SiteConfigContracts = {
  chain: Chain;
  aiApp: `0x${string}`;
  usdt: `0x${string}`;
  entryPoint: `0x${string}`;
  paymaster: `0x${string}`;
  accountFactory: `0x${string}`;
  accountAbstractionSuported: boolean;
};

export const siteConfig = {
  emoji: "🌐",
  name: "AI Planet",
  description: "A crypto platform to launch and monetize AI apps without code",
  links: {
    github: "https://github.com/web3goals/ai-planet-prototype",
  },
  contracts: {
    arbitrumSepolia: {
      chain: arbitrumSepolia,
      aiApp: "0xe05B06f086BE56C22A4cc70708f95d28ca9A8320" as `0x${string}`,
      usdt: "0x63a465e2C7Ca890430f81B7cE8Ad86bc9A4512DD" as `0x${string}`,
      entryPoint: "0xcee8564039B5620b847E91866e54d2DE3fCD10a0" as `0x${string}`,
      paymaster: "0x0702Ae9aff3031a242233F01F1FB35b03AF18a50" as `0x${string}`,
      accountFactory:
        "0xc254cDd94b834966DB91e99bb6aE073Df3F55Bd7" as `0x${string}`,
      accountAbstractionSuported: true,
    } as SiteConfigContracts,
    gnosisChiado: {
      chain: gnosisChiado,
      aiApp: "0x96E6AF6E9e400d0Cd6a4045F122df22BCaAAca59" as `0x${string}`,
      usdt: "0x02008a8DBc938bd7930bf370617065B6B0c1221a" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory:
        "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
    filecoinCalibration: {
      chain: filecoinCalibration,
      aiApp: "0xe720443310986E173af339fA366A30aa0A1Ea5b2" as `0x${string}`,
      usdt: "0x7e2E43D2078463F277FD9a2815143642b14455cb" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory:
        "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
  },
  attestations: {
    schemaId: "SPS_qjtMfH5jcesYNUz47ehTr",
  },
};
