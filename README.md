# ⌘ Vessa Storefront

> A high-fidelity, Headless WooCommerce "Quiet Luxury" editorial storefront.

Built with **Next.js 14 (App Router)**, **TypeScript**, **WPGraphQL**, and **Stripe**. Designed with a premium, minimalist aesthetic inspired by the Vessa lookbook layout.

## 🔗 Live Link

🌐 **[Live Demo](https://headless-ecommerce-six.vercel.app/)**  
*(Note: If your Vercel deployment URL is different, feel free to update this link!)*

---

## ✨ Features

- **Quiet Luxury Design**: Precise editorial layout featuring 3-column product lookbooks, standardized `4:5` product card aspect ratios, dynamic `⌘` iconography, and minimalist typography.
- **Decoupled Architecture**: High-speed storefront utilizing **WPGraphQL** and **WooGraphQL** to fetch and render products dynamically from a self-hosted WordPress/WooCommerce backend.
- **Seamless Stripe Integration**: Fully responsive checkout flow utilizing **Stripe Elements** that adapts seamlessly to light and dark modes.
- **Robust Cart Management**: Persistent client-side cart operations managed seamlessly using **Zustand**.
- **Responsive Navigation**: Minimalist `80px` fixed header, slide-out cart drawer, and fully responsive layouts for all device sizes.
- **Optimized Image Delivery**: Dynamic Next.js Image Optimization mapping live WooCommerce media assets smoothly.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Pure CSS Modules & Vanilla CSS Variables (Neutral luxury palette)
- **State Management**: Zustand (with localStorage persistence)
- **Database / CMS**: Headless WordPress (hosted on Pantheon) + WooCommerce
- **APIs**: GraphQL (WPGraphQL)
- **Payment Processing**: Stripe Node SDK & React Stripe Elements

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have **Node.js** (v18+) and npm installed.

### 2. Environment Setup

Create a `.env.local` file in the root directory and configure the following variables:

```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://dev-headless-ecommerce.pantheonsite.io/graphql
WOOCOMMERCE_CONSUMER_KEY=your_woocommerce_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=your_woocommerce_consumer_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Production Build

To build the application for production:

```bash
npm run build
npm start
```

---

## 📐 Vessa Design Guidelines Applied

- **Typography**: `11px` uppercase labels with `0.15em` letter-spacing, elegant lightweight titles (`300` / `400` font-weights).
- **Aesthetic Gaps**: Strict lookbook grid columns separated by `32px` column-gaps and `64px` row-gaps.
- **Borders**: Sharp `0px` border-radii across buttons, cards, and text inputs to reflect the clean luxury editorial look.
- **Color Palette**: Curated minimalist neutrals (`#fbfbfb` background, `#000000` text, `#666666` muted details).
