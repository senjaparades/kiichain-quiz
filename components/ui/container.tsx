'use client';

import React from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx('max-w-screen-lg mx-auto px-4', className)}>
      {children}
    </div>
  );
}
