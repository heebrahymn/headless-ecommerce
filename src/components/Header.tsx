'use client';
import { useCartStore } from '@/store/cart';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header style={{
      padding: '1rem 2rem',
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      zIndex: 100
    }}>
      <div style={{ fontWeight: 'bold' }}>HEADLESS CLOTHING</div>
      <div data-testid="cart-count">
        Cart: {cartCount}
      </div>
    </header>
  );
}
