import '@/styles/app.scss'
import { GlobalProvider } from '@/context/GlobalContext';

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}
