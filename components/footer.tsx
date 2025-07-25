'use client';

import { FaGithub, FaDiscord, FaTwitter, FaGlobe } from 'react-icons/fa';
import Container from '@/components/ui/container';

export default function Footer() {
  return (
    <footer className="w-full bg-blue-950 text-yellow-500 border-t border-yellow-800 mt-auto py-6 text-sm shadow-inner">
      <Container>
        <p className="italic text-center text-yellow-400 mb-4">
          &quot;Grow your knowledge, and earn the chain!&quot;
        </p>

        <nav className="flex justify-center gap-6 text-xl mb-4" aria-label="Social links">
          <a
            href="https://kiichain.io/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="KiiChain Website"
            className="hover:text-white transition duration-200"
          >
            <FaGlobe />
          </a>
          <a
            href="https://github.com/KiiChain"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://discord.gg/kiichain"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="hover:text-white transition duration-200"
          >
            <FaDiscord />
          </a>
          <a
            href="https://x.com/KiiChainio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter/X"
            className="hover:text-white transition duration-200"
          >
            <FaTwitter />
          </a>
        </nav>

        <p className="text-center text-xs text-yellow-600">
          Built with 💙 by the KiiChain Community
        </p>
      </Container>
    </footer>
  );
}
