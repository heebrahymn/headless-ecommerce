import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Handle different import styles for the SDK
const WooCommerce = (WooCommerceRestApi as any).default || WooCommerceRestApi;

const api = new WooCommerce({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL?.split('/graphql')[0] || '',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  version: "wc/v3",
  queryStringAuth: true,
  axiosConfig: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export default api;
