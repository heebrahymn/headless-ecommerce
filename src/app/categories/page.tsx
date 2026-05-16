import { getCategories } from "@/lib/woocommerce";
import Link from "next/link";
import Image from "next/image";
import styles from "./categories.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={`${styles.badge} reveal`}>
          <span>⌘</span>
          CATEGORIES
        </div>
        <h1 className={`${styles.title} reveal`}>Collections</h1>
        <p className={`${styles.subtitle} reveal`}>
          Explore our intentionally designed collections, ranging from essential foundations to seasonal limited editions.
        </p>
      </header>

      <main className={styles.grid}>
        {categories.map((category: any) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`} 
            className={`${styles.categoryCard} reveal`}
          >
            <div className={styles.imageContainer}>
              {category.image ? (
                <Image
                  src={category.image.sourceUrl}
                  alt={category.image.altText || category.name}
                  fill
                  className={styles.image}
                />
              ) : (
                <div className={styles.placeholder} />
              )}
              <div className={styles.overlay} />
              <div className={styles.labelContainer}>
                <h3 className={styles.categoryName}>
                  <span>⌘</span>
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </main>

      {categories.length === 0 && (
        <div className={styles.empty}>
          <p>No collections found.</p>
        </div>
      )}
    </div>
  );
}
