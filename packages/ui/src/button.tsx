import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-zinc-900 text-white hover:bg-zinc-800'
      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200';
  return (
    <button type="button" className={[base, styles, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </button>
  );
}

export { Button as NexusButton };
