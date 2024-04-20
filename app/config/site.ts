import { Chain, arbitrumSepolia } from "viem/chains";

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
  },
  attestations: {
    schemaId: "SPS_qjtMfH5jcesYNUz47ehTr",
  },
};
