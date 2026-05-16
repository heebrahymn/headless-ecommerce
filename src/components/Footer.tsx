'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={`${styles.footer} reveal`}>
      <div className={styles.container}>
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>Stay in the know</h3>
            <p className={styles.newsletterSubtitle}>
              Join our list for exclusive drops and limited editions.
            </p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address" 
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </div>

        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              Clothing <span>Plug</span>
            </Link>
            <p className={styles.tagline}>
              Curated essentials for the modern wardrobe. Defined by quality, designed for longevity.
            </p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>Shop</h4>
              <Link href="/">All Products</Link>
              <Link href="/categories">Collections</Link>
              <Link href="/new">New Arrivals</Link>
            </div>
            <div className={styles.column}>
              <h4>Company</h4>
              <Link href="/about">Our Story</Link>
              <Link href="/sustainability">Sustainability</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className={styles.column}>
              <h4>Support</h4>
              <Link href="/faq">FAQ</Link>
              <Link href="/shipping">Shipping</Link>
              <Link href="/returns">Returns</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© 2025 Clothing Plug. Crafted with purpose.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/instagram">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
