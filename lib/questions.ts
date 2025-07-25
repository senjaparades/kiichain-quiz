// lib/questions.ts

export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export const questions: Question[] = [
  {
    question: 'What is KIIEX?',
    options: [
      'A governance portal on KiiChain',
      'A hybrid exchange for FX and RWA trading',
      'A lending platform for stablecoins',
      'A decentralized NFT marketplace',
    ],
    answer: "1",
  },
  {
    question: 'What type of exchange is KIIEX?',
    options: ['Decentralized only', 'Centralized only', 'Hybrid', 'Order book DEX'],
    answer: "2",
  },
  {
    question: 'KIIEX focuses on which use case?',
    options: ['Gaming assets', 'Cross-border payments and trading', 'Metaverse NFTs', 'DeFi lending'],
    answer: "1",
  },
  {
    question: 'What powers the backend of KIIEX?',
    options: ['KiiChain', 'Binance Smart Chain', 'Solana', 'Polkadot'],
    answer: "0",
  },
  {
    question: 'KIIEX supports which type of token as primary liquidity?',
    options: ['Local currency stablecoins and RWAs', 'Only ETH', 'Only BTC', 'Utility tokens'],
    answer: "0",
  },
  {
    question: 'What is the hybrid matching engine in KIIEX designed for?',
    options: [
      'Sourcing liquidity across blockchains and pricing centrally',
      'Streaming music on chain',
      'Running proof-of-work mining',
      'Connecting NFTs to metaverse',
    ],
    answer: "0",
  },
  {
    question: 'What type of ramps are supported by KIIEX?',
    options: ['Only off-ramps', 'Only on-ramps', 'None', 'Both on/off ramps'],
    answer: "3",
  },
  {
    question: 'KIIEX supports payins and payouts via?',
    options: ['Local fiat channels', 'Credit card only', 'NFT swapping', 'Only DEX routing'],
    answer: "0",
  },
  {
    question: 'What is the name of KiiChain’s active testnet?',
    options: ['KTest', 'Oro Open Testnet', 'EmeraldNet', 'KiiMain'],
    answer: "1",
  },
  {
    question: 'What is the purpose of Oro Testnet?',
    options: [
      'Only for token airdrop claims',
      'To reward builders contributing real code',
      'To test NFTs only',
      'To run validator elections',
    ],
    answer: "1",
  },
  {
    question: 'How can developers earn Oro tokens?',
    options: [
      'By minting NFTs',
      'By liking tweets',
      'By submitting production-level pull requests',
      'By joining Telegram',
    ],
    answer: "2",
  },
  {
    question: 'The Oro airdrop is intended for?',
    options: ['Active contributors', 'Random users', 'Validators only', 'Passive airdrop hunters'],
    answer: "0",
  },
  {
    question: 'Where is the KiiChain code hosted for contribution?',
    options: ['GitHub', 'GitLab', 'Dropbox', 'Bitbucket'],
    answer: "0",
  },
  {
    question: 'Which of these is a current build open to contributors?',
    options: ['Layer 0 DNS', 'Kii Explorer Chatbot', 'EVM Fee Abstraction', 'NFT Lending System'],
    answer: "2",
  },
  {
    question: 'The EVM fee abstraction in KiiChain enables?',
    options: [
      'Gas paid in whitelisted stablecoins',
      'Fixed interest yield farming',
      'Removal of validators',
      'Stablecoin transfers to be taxed',
    ],
    answer: "0",
  },
  {
    question: 'What problem does KIIEX try to solve in emerging markets?',
    options: [
      'NFT speculation bubbles',
      'Low DeFi liquidity in Europe',
      'Expensive cross-border settlements',
      'Staking reward inflation',
    ],
    answer: "2",
  },
  {
    question: 'How often can the matching engine of KIIEX operate?',
    options: ['Hourly', '24/7 on select pairs', 'Only business hours', 'Only weekdays'],
    answer: "1",
  },
  {
    question: 'Who can participate in the Oro developer rewards?',
    options: [
      'Only token holders',
      'Anyone with valid pull requests',
      'Only DAO members',
      'Only KYC-verified users',
    ],
    answer: "1",
  },
  {
    question: 'What does the “hybrid” aspect of KIIEX refer to?',
    options: [
      'Combination of centralized pricing with on-chain liquidity',
      'Mixing NFTs and gaming tokens',
      'Integration with fiat and crypto bridges',
      'Mixture of proof-of-work and staking',
    ],
    answer: "0",
  },
  {
    question: 'KIIEX is ideal for users needing?',
    options: [
      'Interoperable DeFi swaps and fiat liquidity',
      'Music streaming with crypto',
      'L2 gaming engines',
      'Play-to-earn games',
    ],
    answer: "0",
  },
];

export default questions;
