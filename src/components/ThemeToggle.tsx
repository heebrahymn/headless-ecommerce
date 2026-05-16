'use client';
import { useCartStore } from '@/store/cart';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useCartStore();

  return (
    <button 
      className={styles.toggle} 
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}
