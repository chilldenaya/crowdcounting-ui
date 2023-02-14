import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import TheLayout from '@/_App/TheLayout'

export default function App({ Component, pageProps, router }: AppProps) {
  const isInDashboard = router.pathname.split('/')[1] === 'dashboard'

  return (
    <>
      {isInDashboard ? (
        <TheLayout>
          <Component {...pageProps} />
        </TheLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
