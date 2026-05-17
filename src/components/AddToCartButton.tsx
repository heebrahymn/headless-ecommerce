'use client';
import { useCartStore } from "@/store/cart";
import styles from "./AddToCartButton.module.css";

interface AddToCartButtonProps {
  product: {
    id: string;
    databaseId: number;
    name: string;
    price: string;
    image?: {
      sourceUrl: string;
    };
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const numericPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, "") || "0");
    
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
    <button className={styles.button} onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
