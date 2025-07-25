'use client';

import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;

// ✅ Tambahkan ini
export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn('text-lg font-semibold text-zinc-900 dark:text-zinc-100', className)}
    {...props}
  />
));
DialogTitle.displayName = RadixDialog.Title.displayName;

export function DialogContent({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      <RadixDialog.Content
        {...props}
        className={cn(
          'fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-zinc-900 z-50 shadow-xl p-6 overflow-auto',
          className
        )}
      >
        {children}
        <RadixDialog.Close className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition">
          <X className="h-5 w-5" />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
