'use client';
import { useCartStore } from '@/store/cart';

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button 
      data-testid="add-to-cart" 
      onClick={() => addItem({ ...product, quantity: 1 })}
      style={{
        padding: '1rem 2rem',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Add to Cart
    </button>
  );
}
