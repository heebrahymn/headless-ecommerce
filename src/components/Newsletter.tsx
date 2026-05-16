'use client';
import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Join the <span className={styles.accent}>Inner Circle</span></h2>
          <p className={styles.subtitle}>
            Subscribe to receive early access to new drops, exclusive minimalist guides, and member-only pricing.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {status === 'success' ? (
            <div className={styles.successMessage}>
              ✨ Welcome to the collective. Check your inbox.
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
                disabled={status === 'loading'}
              />
              <button 
                type="submit" 
                className={styles.button}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
