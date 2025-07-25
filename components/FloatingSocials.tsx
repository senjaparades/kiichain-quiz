'use client';

import Image from 'next/image';

const socials = [
  { href: 'https://explorer.kiichain.io/', icon: 'web', label: 'Explorer' },
  { href: 'https://x.com/KiiChainio', icon: 'twitter', label: 'X (Twitter)' },
  { href: 'https://discord.gg/kiichain', icon: 'discord', label: 'Discord' },
];

export default function FloatingSocials() {
  return (
    <div className="fixed bottom-[160px] right-4 flex flex-col items-end space-y-3 z-50">
      {socials.map(({ href, icon, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}>
          <Image
            src={`/icons/${icon}.png`}
            alt={label}
            width={24}
            height={24}
            className="hover:scale-110 transition"
          />
        </a>
      ))}
    </div>
  );
}
