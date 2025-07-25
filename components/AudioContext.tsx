'use client';

import { createContext, useContext, useState } from 'react';

interface AudioContextType {
  play: boolean;
  triggerPlay: () => void;
}

const AudioContext = createContext<AudioContextType>({
  play: false,
  triggerPlay: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [play, setPlay] = useState(false);
  const triggerPlay = () => setPlay(true);

  return (
    <AudioContext.Provider value={{ play, triggerPlay }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
