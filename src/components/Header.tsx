'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const { items, toggleCart } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            Clothing <span className={styles.studio}>Plug</span>
          </Link>
        </div>
        
        <nav className={styles.center}>
          <Link href="/" className={styles.navLink}>Shop</Link>
          <Link href="/about" className={styles.navLink}>Our Story</Link>
          <Link href="/categories" className={styles.navLink}>Collection</Link>
        </nav>

        <div className={styles.right}>
          <SearchBar />
          <ThemeToggle />
          <button 
            className={styles.cartButton}
            onClick={() => toggleCart(true)}
          >
            Cart
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
