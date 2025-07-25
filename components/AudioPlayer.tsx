'use client';

import { useEffect, useRef } from 'react';
import { useAudio } from './AudioContext';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { play } = useAudio();

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/musicbg.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    if (play && audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.warn('Autoplay blocked:', err));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [play]);

  return null; // audio tidak perlu ditampilkan, sudah dikelola manual
}
