import { fetchWooCommerce } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import styles from "./category.module.css";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getCategoryWithProducts(slug: string) {
  const data = await fetchWooCommerce(`
    query GetCategoryWithProducts($slug: ID!) {
      productCategory(id: $slug, idType: SLUG) {
        id
        name
        slug
        description
        products(first: 50) {
          nodes {
            id
            databaseId
            name
            slug
            shortDescription
            image {
              sourceUrl
              altText
            }
            ... on SimpleProduct {
              price
              regularPrice
            }
            ... on VariableProduct {
              price
              regularPrice
            }
          }
        }
      }
    }
  `, { slug });

  return data.productCategory;
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryWithProducts(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={`${styles.badge} reveal`}>
          <span>⌘</span>
          CATEGORIES
        </div>
        <h1 className={`${styles.title} reveal`}>{category.name}</h1>
        {category.description && (
          <div 
            className={`${styles.subtitle} reveal`}
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
        )}
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {category.products?.nodes.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {category.products?.nodes.length === 0 && (
          <div className={styles.empty}>
            <p>No products found in this collection.</p>
          </div>
        )}
      </main>
    </div>
  );
}
