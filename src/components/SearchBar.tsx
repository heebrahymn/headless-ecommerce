'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21L16.65 16.65" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}
