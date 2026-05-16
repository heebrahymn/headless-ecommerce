'use client';
import { useCartStore } from '@/store/cart';
import styles from './product.module.css';

interface Product {
  id: string;
  databaseId: number;
  name: string;
  price: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const numericPrice = parseFloat(product.price?.replace(/[^0-9.-]+/g, "") || "0");
    
    addItem({
      id: product.id,
      databaseId: product.databaseId,
      name: product.name,
      price: numericPrice,
      quantity: 1,
      image: product.image?.sourceUrl,
    });
  };

  return (
    <button 
      data-testid="add-to-cart" 
      onClick={handleAddToCart}
      className={styles.addToCartBtn}
    >
      Add to Bag
    </button>
  );
}
