import { getProduct, getProducts } from "@/lib/woocommerce";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import Accordion from "@/components/Accordion";
import styles from "./product.module.css";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getProducts(100);
  return products.map((product: any) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const accordionItems = [
    {
      title: "The Details",
      content: product.description || "No detailed description available."
    },
    {
      title: "Care & Composition",
      content: "Crafted from 100% premium organic materials. Hand wash only. Lay flat to dry to maintain shape and longevity."
    },
    {
      title: "Shipping & Returns",
      content: "Express global shipping (2-5 business days). Complimentary returns within 14 days of delivery for all unworn items."
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.imageSection}>
          {product.image ? (
            <div className={styles.imageWrapper}>
              <Image
                src={product.image.sourceUrl}
                alt={product.image.altText || product.name}
                fill
                priority
                className={styles.image}
              />
            </div>
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>

        <div className={styles.contentSection}>
          <nav className={styles.breadcrumb}>
            <Link href="/">Shop</Link> / <span>{product.name}</span>
          </nav>
          
          <div className={styles.badge}>PREMIUM EDITION</div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>{product.price}</p>
          
          {product.shortDescription && (
            <div 
              className={styles.shortDescription} 
              dangerouslySetInnerHTML={{ __html: product.shortDescription }} 
            />
          )}

          <AddToCartButton product={product} />

          <Accordion items={accordionItems} />
        </div>
      </div>
    </div>
  );
}
