// GlobalAudioWrapper.tsx
'use client';

import { useEffect } from 'react';
import { useAudio } from './AudioContext';
import AudioPlayer from './AudioPlayer';

let hasTriggered = false; // ⛳ simpan di luar komponen (persisten)

export default function GlobalAudioWrapper() {
  const { triggerPlay } = useAudio();

  useEffect(() => {
    const handleClick = () => {
      if (!hasTriggered) {
        triggerPlay();
        hasTriggered = true;
        window.removeEventListener('click', handleClick);
        window.removeEventListener('touchstart', handleClick);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, [triggerPlay]);

  return <AudioPlayer />;
}
