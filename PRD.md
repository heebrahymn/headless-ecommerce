# Product Requirements Document (PRD): Headless WooCommerce Next.js Storefront

## 1. Overview
A modern, headless e-commerce storefront for a physical clothing brand. The project aims to deliver a lightning-fast user experience with strict performance targets while maintaining the content management flexibility of WordPress and WooCommerce.

## 2. Core Architecture
- **Frontend Framework:** Next.js 14 (App Router)
- **Backend/CMS:** WordPress + WooCommerce (Fresh Install)
- **Styling:** Vanilla CSS / CSS Modules (Strictly chosen to ensure Lighthouse 95+ scores by eliminating CSS bloat)
- **Hosting / Deployment:** Vercel

## 3. Data & Content Strategy
- **Product Data Delivery:** Fetched via GraphQL/REST from the WordPress backend.
- **Rendering Strategy:** Incremental Static Regeneration (ISR) for the core catalogue (anticipated scale: 50–500 products).
- **Cache Invalidation:** Smart, batched cache invalidation via the `WPGraphQL Smart Cache` plugin to prevent Next.js serverless function timeouts during bulk inventory updates.
- **SEO Implementation:** 
  - Dynamic Open Graph (OG) tags
  - JSON-LD structured data
  - XML sitemaps
  - *Note: All SEO metadata will be generated natively within Next.js to avoid heavy WordPress SEO plugin payloads on the frontend.*

## 4. Checkout & Cart Flow (The "Safe Headless" Model)
- **Authentication:** Guest Checkout only (Phase 1) to minimize friction and scope.
- **Cart State Persistence:** Client-side state managed via Zustand with `localStorage` persistence, ensuring carts survive tab closures and page refreshes.
- **Inventory Protection:** Live, server-side data fetch (uncached) at the initiation of the checkout step to prevent race conditions on stock levels.
- **Payment Sync Strategy:**
  1. Next.js creates a "Pending Payment" order in WooCommerce.
  2. Next.js fetches the Stripe Payment Intent linked to that order.
  3. The user pays securely via embedded Stripe Elements within the Next.js UI.
  4. Stripe webhooks directly to the WooCommerce backend to confirm payment and update the order status to "Processing".
- **Error Handling:** Explicit, human-readable error mapping in the UI for all payment and validation failures (e.g., catching Stripe error codes and displaying localized messages).

## 5. Performance & Quality Assurance
- **Performance Target:** Lighthouse 95+ across all four metrics (Performance, Accessibility, Best Practices, SEO).
- **Image Optimization:** 
  - Strict enforcement of `priority` and `sizes` attributes on LCP (Largest Contentful Paint) images.
  - Pre-optimized WebP serving from the WordPress backend to protect Vercel Image Optimization quotas.
- **E2E Testing:** 
  - Cypress test suite covering the critical conversion path: Add to Cart -> Checkout -> Payment Success.
- **CI/CD Pipeline:** 
  - Cypress runs autonomously via GitHub Actions against Vercel Preview URLs.
  - *Constraint Guard:* Tests are triggered exclusively on Pull Requests targeting the `main` branch to optimize GitHub Action minutes and prevent CI bottlenecks.


