import { getProducts } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import styles from "./search.module.css";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  const products = await getProducts(20, query);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Search Results for <span className={styles.accent}>"{query}"</span>
        </h1>
        <p className={styles.count}>Found {products.length} items</p>
      </header>

      <main className={styles.main}>
        {products.length > 0 ? (
          <div className={styles.grid}>
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2>No matches found</h2>
            <p>Try adjusting your search or browse our full collection.</p>
          </div>
        )}
      </main>
    </div>
  );
}
