import Head from 'next/head';
import Script from 'next/script';


//components
import Welcomepage from '@/components/Welcomepage';
import ogimage from "@/pic/mindfuckimage.png";


export default function Home( ) {
  return (
    <>
      <Head>
        <title>Mindfuck home</title>
        <meta name="description" content="Test your cognitive skills and compare them with others." />
        <meta
          property="og:title"
          content="Let's mindfuck yourself." 
          key="title"
        />

        <meta
          property="og:description"
          content="Test your cognitive skills and compare them with others." 
          key="description"
        />
        <meta
          property="og:image"
          href="https://cdn.midjourney.com/6f157fe0-adfa-4e4f-b5aa-f09bd3934726/0_0.png"
          key="image"
        />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:width"
          content="500"
        />
        <meta
          property="og:image:height"
          content="500"
        />

        <meta name="author" content="Ondrej Laube" />

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
