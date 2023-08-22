
import Script from 'next/script';

//components
import Gamefield from '@/components/Gamefield';

export default function Game( ) {
  return (
    <>
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
      <Gamefield />
      </main>
    </>
  )
}
