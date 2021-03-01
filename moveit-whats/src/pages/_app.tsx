import '../styles/global.css';
import { PageMenuContextProvider } from '../contexts/PageMenuContext';


function MyApp({ Component, pageProps}) {

  return (
    <PageMenuContextProvider>
      <Component {...pageProps} />
    </PageMenuContextProvider>
  )
}

export default MyApp
