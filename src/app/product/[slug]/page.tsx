import { getProduct } from '@/lib/woocommerce';
import AddToCartButton from './AddToCartButton';
import styles from './product.module.css';

export const revalidate = 3600; // ISR revalidation every hour

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  return {
    title: `${product.name} | Headless Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>{product.name}</h1>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.description}>
          {product.description}
        </div>
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
