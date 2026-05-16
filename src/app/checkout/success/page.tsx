'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import styles from './success.module.css';

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.message}>
          Your order has been placed successfully. We've sent a confirmation email with all the details.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryButton}>
            Continue Shopping
          </Link>
          <Link href="/" className={styles.secondaryButton}>
            View Your Orders
          </Link>
        </div>
      </div>
    </main>
  );
}
