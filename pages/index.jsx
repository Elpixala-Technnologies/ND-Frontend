import Home from '@/src/Components/Home/Home/Home'
import { CartProvider } from '@/src/Context/cartContext'
import RootLayout from '@/src/Layouts/RootLayout'
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Book Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <CartProvider>
        <RootLayout>
          <main>
            <Home />
          </main>
        </RootLayout>
      </CartProvider>
    </>
  );
}
