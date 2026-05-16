'use client';
import { useCartStore } from '@/store/cart';
import styles from './CartDrawer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCartStore();
  
  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className={styles.overlay} onClick={() => toggleCart(false)} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button className={styles.close} onClick={() => toggleCart(false)}>✕</button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <p>Your cart is empty</p>
              <button className={styles.shopNow} onClick={() => toggleCart(false)}>Shop Now</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImage}>
                  {item.image ? (
                    <img 
                      src={typeof item.image === 'string' ? item.image : (item.image as any).sourceUrl || ''} 
                      alt={item.name} 
                      className={styles.thumbnail}
                    />
                  ) : (
                    <div className={styles.placeholder} />
                  )}
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className={styles.remove} onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>


        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal</span>
              <span className={styles.totalAmount}>${total.toFixed(2)}</span>
            </div>
            <p className={styles.taxNote}>Shipping & taxes calculated at checkout.</p>
            <Link 
              href="/checkout" 
              className={styles.checkoutButton}
              onClick={() => toggleCart(false)}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
