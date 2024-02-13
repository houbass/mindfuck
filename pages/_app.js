import '@/styles/globals.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
        <Head>
        <title>Mindfuck game</title>
        <meta name="description" content="Test your cognitive functions and and try to be faster then others." />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:title"
          content="Let's mindfuck yourself." 
        />


        <meta
          property="og:description"
          content="Test your cognitive functions and and try to be faster then others." 
        />
        <meta
          property="og:image"
          content="mindfuckimage.png"
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

        <meta name="seznam-wmt" content="8yiSqv2pEPwJm3SLPvfO2kclA9FzZ13V" />
        <meta name="yandex-verification" content="62505ed5cd9f8f38" />
            
      </Head>
      <Component {...pageProps} />
    </>

  )
}
