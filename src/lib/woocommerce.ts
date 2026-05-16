const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;

export async function fetchWooCommerce(query: string, variables = {}) {
  if (!WOOCOMMERCE_URL || WOOCOMMERCE_URL.includes('your-wordpress-site.com')) {
    // Return mock data for testing if no URL is provided
    if (query.includes('GetProduct')) {
      return { product: { id: '1', name: 'Test Shirt', price: 20, description: 'Mock description' } };
    }
    return { products: { nodes: [] } };
  }

  const res = await fetch(WOOCOMMERCE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getProduct(slug: string) {
  const data = await fetchWooCommerce(`
    query GetProduct($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        id
        databaseId
        name
        slug
        description
        shortDescription
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          stockStatus
          stockQuantity
        }
        ... on VariableProduct {
          price
          regularPrice
        }
      }
    }
  `, { slug });

  return data.product;
}

export async function getProducts(first = 10, search = "") {
  const data = await fetchWooCommerce(`
    query GetProducts($first: Int, $search: String) {
      products(first: $first, where: { search: $search }) {
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
  `, { first, search });

  return data.products?.nodes || [];
}

export async function getCategories() {
  const data = await fetchWooCommerce(`
    query GetCategories {
      productCategories(first: 20) {
        nodes {
          id
          name
          slug
          description
          image {
            sourceUrl
            altText
          }
          count
        }
      }
    }
  `);

  return data.productCategories?.nodes || [];
}
