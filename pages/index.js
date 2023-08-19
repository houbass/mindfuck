import Head from 'next/head';
import Script from 'next/script';


//components
import Welcomepage from '@/components/Welcomepage';


export default function Home( ) {
  return (
    <>
      <Head>
        <title>Mindfuck home</title>
        <meta name="description" content="Test your cognitive skills and compare them with others." />
        <meta
          property="og:description"
          content="Test your cognitive skills and compare them with others."
        />
        <meta
          property="og:image"
          content="https://mindfuckgame.com/image?url=%2F_next%2Fstatic%2Fmedia%2Fmindfuckimage.5a0cfefb.png&amp;w=500&amp;q=75"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Z1WEJKD0E4" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Z1WEJKD0E4');
          `}
      </Script>

      <main className='main'>
        <Welcomepage />
      </main>
    </>
  )
}
