# 🌐 KiiQuiz — Web3 Blockchain Quiz Powered by Kiichain

![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-blue)
![Kiichain Testnet](https://img.shields.io/badge/Network-Kiichain%20Testnet-green)
![Deployed on Vercel](https://img.shields.io/badge/Live%20on-Vercel-black)

**KiiQuiz** is a fun and interactive Web3 quiz platform built on **Kiichain**, designed to onboard users to the world of blockchain through gamified learning.

> 🎵 Featuring original soundtrack [KIIEX](https://x.com/senjaparadesa/status/1949424796053516789) — powered by rhythm and decentralization.

---

## 🌍 Live Project

- 🖥️ Live Demo: [https://kiichain-quiz.vercel.app](https://kiichain-quiz.vercel.app)
- 🛠️ Source Code: [GitHub Repository](https://github.com/senjaparades/kiichain-quiz)
- 🧾 Supabase Backend: [jjkbipjinsfnffrluxmp.supabase.co](https://jjkbipjinsfnffrluxmp.supabase.co)

---

## 🚀 Features

- ✅ Onchain score submission with `submitScore(uint256)` on Kiichain
- 🔐 Admin controls: quiz activation, max score, and round switching
- ⏱️ 15-second timer per question
- 🎯 70% score threshold to qualify for leaderboard
- 🪙 One submission per wallet per round (`hasUserSubmitted`)
- 🏆 Leaderboard powered by Supabase

---

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Wagmi + Viem](https://wagmi.sh/)
- [Kiichain Testnet](https://kiichain.io/)
- [Supabase](https://supabase.com/)

---

## 🎮 How to Play

1. Connect your wallet (Kiichain Testnet).
2. Start the quiz — 1 question at a time, 15 seconds each.
3. Score at least 70% correct answers.
4. Submit your score to the blockchain + Supabase.
5. Only one submission is allowed per wallet per round.

---

## ⚙️ Local Development Setup

```bash
git clone https://github.com/senjaparades/kiichain-quiz
cd kiichain-quiz
npm install
cp .env.example .env.local
```

Edit file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://jjkbipjinsfnffrluxmp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_KIICHAIN_RPC=https://json-rpc.uno.sentry.testnet.v3.kiivalidator.com/
```

Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Screenshots

*(Add gameplay, leaderboard, or admin control screenshots here, or link to Medium article if available.)*

---

## 💡 Why KiiQuiz?

KiiQuiz introduces Kiichain and its ecosystem in a gamified, accessible way.  
Users experience smart contract interaction, blockchain-based validation, and database integration — all through the simple joy of a quiz.

> Built not just with code, but with rhythm and community.

---

## 🎁 Contribution & ORO Reward

This project is part of an open-source initiative to support the Kiichain ecosystem.

- 💰 Submit a PR and earn up to **2,000 ORO**, based on contribution impact.
- 📩 To claim your reward, open a support ticket via **Kiichain Discord**.

---

## 🔗 Related Links

- 🌐 [Kiichain Official Website](https://kiichain.io/)
- 🧾 Smart Contract ABI (included in repo)
- 📘 [KiiQuiz on Medium](https://medium.com/@dwi.adigunawan.spt/kiiquiz-74482f515a93)
- 👨‍💻 Developer: [@senjaparades](https://x.com/senjaparadesa)

---

## 🧠 License

MIT — Powered by ❤️, music, and the Kiichain Community.
