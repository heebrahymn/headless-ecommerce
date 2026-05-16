'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cart';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useCartStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
