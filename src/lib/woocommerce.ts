// Mock fetcher for now, replace with actual GraphQL/REST later
export async function getProduct(slug: string) {
  // In a real app, this would be a fetch to WooCommerce
  return { 
    id: '1', 
    slug, 
    name: 'Test Shirt', 
    price: 20, 
    description: 'A premium test shirt for our headless store.' 
  };
}
