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
    answer: 'A hybrid exchange for FX and RWA trading',
  },
  {
    question: 'What type of exchange is KIIEX?',
    options: ['Decentralized only', 'Centralized only', 'Hybrid', 'Order book DEX'],
    answer: 'Hybrid',
  },
  {
    question: 'KIIEX focuses on which use case?',
    options: ['Gaming assets', 'Cross-border payments and trading', 'Metaverse NFTs', 'DeFi lending'],
    answer: 'Cross-border payments and trading',
  },
  {
    question: 'What powers the backend of KIIEX?',
    options: ['KiiChain', 'Binance Smart Chain', 'Solana', 'Polkadot'],
    answer: 'KiiChain',
  },
  {
    question: 'KIIEX supports which type of token as primary liquidity?',
    options: ['Local currency stablecoins and RWAs', 'Only ETH', 'Only BTC', 'Utility tokens'],
    answer: 'Local currency stablecoins and RWAs',
  },
  {
    question: 'What is the hybrid matching engine in KIIEX designed for?',
    options: [
      'Sourcing liquidity across blockchains and pricing centrally',
      'Streaming music on chain',
      'Running proof-of-work mining',
      'Connecting NFTs to metaverse',
    ],
    answer: 'Sourcing liquidity across blockchains and pricing centrally',
  },
  {
    question: 'What type of ramps are supported by KIIEX?',
    options: ['Only off-ramps', 'Only on-ramps', 'None', 'Both on/off ramps'],
    answer: 'Both on/off ramps',
  },
  {
    question: 'KIIEX supports payins and payouts via?',
    options: ['Local fiat channels', 'Credit card only', 'NFT swapping', 'Only DEX routing'],
    answer: 'Local fiat channels',
  },
  {
    question: 'What is the name of KiiChain’s active testnet?',
    options: ['KTest', 'Oro Open Testnet', 'EmeraldNet', 'KiiMain'],
    answer: 'Oro Open Testnet',
  },
  {
    question: 'What is the purpose of Oro Testnet?',
    options: [
      'Only for token airdrop claims',
      'To reward builders contributing real code',
      'To test NFTs only',
      'To run validator elections',
    ],
    answer: 'To reward builders contributing real code',
  },
  {
    question: 'How can developers earn Oro tokens?',
    options: [
      'By minting NFTs',
      'By liking tweets',
      'By submitting production-level pull requests',
      'By joining Telegram',
    ],
    answer: 'By submitting production-level pull requests',
  },
  {
    question: 'The Oro airdrop is intended for?',
    options: ['Active contributors', 'Random users', 'Validators only', 'Passive airdrop hunters'],
    answer: 'Active contributors',
  },
  {
    question: 'Where is the KiiChain code hosted for contribution?',
    options: ['GitHub', 'GitLab', 'Dropbox', 'Bitbucket'],
    answer: 'GitHub',
  },
  {
    question: 'Which of these is a current build open to contributors?',
    options: ['Layer 0 DNS', 'Kii Explorer Chatbot', 'EVM Fee Abstraction', 'NFT Lending System'],
    answer: 'EVM Fee Abstraction',
  },
  {
    question: 'The EVM fee abstraction in KiiChain enables?',
    options: [
      'Gas paid in whitelisted stablecoins',
      'Fixed interest yield farming',
      'Removal of validators',
      'Stablecoin transfers to be taxed',
    ],
    answer: 'Gas paid in whitelisted stablecoins',
  },
  {
    question: 'What problem does KIIEX try to solve in emerging markets?',
    options: [
      'NFT speculation bubbles',
      'Low DeFi liquidity in Europe',
      'Expensive cross-border settlements',
      'Staking reward inflation',
    ],
    answer: 'Expensive cross-border settlements',
  },
  {
    question: 'How often can the matching engine of KIIEX operate?',
    options: ['Hourly', '24/7 on select pairs', 'Only business hours', 'Only weekdays'],
    answer: '24/7 on select pairs',
  },
  {
    question: 'Who can participate in the Oro developer rewards?',
    options: [
      'Only token holders',
      'Anyone with valid pull requests',
      'Only DAO members',
      'Only KYC-verified users',
    ],
    answer: 'Anyone with valid pull requests',
  },
  {
    question: 'What does the “hybrid” aspect of KIIEX refer to?',
    options: [
      'Combination of centralized pricing with on-chain liquidity',
      'Mixing NFTs and gaming tokens',
      'Integration with fiat and crypto bridges',
      'Mixture of proof-of-work and staking',
    ],
    answer: 'Combination of centralized pricing with on-chain liquidity',
  },
  {
    question: 'KIIEX is ideal for users needing?',
    options: [
      'Interoperable DeFi swaps and fiat liquidity',
      'Music streaming with crypto',
      'L2 gaming engines',
      'Play-to-earn games',
    ],
    answer: 'Interoperable DeFi swaps and fiat liquidity',
  },
];

export default questions;
