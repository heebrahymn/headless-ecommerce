'use client';
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    shortDescription?: string;
    image?: {
      sourceUrl: string;
      altText: string;
    };
    price?: string;
    regularPrice?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Parse price string (e.g., "$29.99" -> 29.99)
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
    <Link href={`/product/${product.slug}`} className={`${styles.card} reveal`}>
      <div className={styles.imageContainer}>
        {product.image ? (
          <Image
            src={product.image.sourceUrl}
            alt={product.image.altText || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.content}>
        <h5 className={styles.title}>{product.name}</h5>
        <p className={styles.price}>{product.price}</p>
      </div>
    </Link>
  );
}
