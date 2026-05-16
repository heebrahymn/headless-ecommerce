import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clothing Plug | Premium Minimalist Storefront",
  description: "The ultimate destination for curated premium essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main style={{ paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}

