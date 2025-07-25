'use client';

import { ReactNode } from 'react';
import GlobalAudioWrapper from './GlobalAudioWrapper';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <GlobalAudioWrapper />
    </>
  );
}
