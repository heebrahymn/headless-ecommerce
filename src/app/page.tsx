import { getProducts } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const revalidate = 3600;

export default async function Home() {
  const products = await getProducts(12);

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroLayout}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>EST. 2025</div>
            <h1 className={styles.title}>
              Curated <br />Essentials
            </h1>
            <p className={styles.subtitle}>
              Defining the modern wardrobe through intentional design and unparalleled quality.
            </p>
            <Link href="#collection" className={styles.heroCTA}>
              Discover Collection
            </Link>
          </div>
          <div className={styles.heroImageContainer}>
            <Image 
              src="/vessa_hero_lifestyle_editorial_1778968877493.png" 
              alt="Editorial Lifestyle" 
              fill
              priority
              className={styles.heroImage}
            />
          </div>
        </div>
      </header>

      <main className={styles.main} id="collection">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Arrivals</h2>
          <div className={styles.sectionDivider}></div>
        </div>
        
        <div className={styles.grid}>
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className={styles.empty}>
            <p>No products found. Add some products in your WooCommerce dashboard.</p>
          </div>
        )}
      </main>
    </div>
  );
}
