import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { NotFoundImage } from '@/src/Assets';

const NotFoundPage = () => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      window.location.href = '/'; // Redirecting using vanilla JS on the client-side
    }, 3000);

    return () => clearTimeout(redirect); // Clearing the timeout on component unmount
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="This is news portal of programming hero made by next-js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={NotFoundImage}
        width={700}
        height={500}
        alt="error_image"
        style={{ display: 'flex', margin: '50px auto' }}
      />
      <Link href="/">
        <button>Back To Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
