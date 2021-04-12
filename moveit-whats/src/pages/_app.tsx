import '../styles/global.css';
import {UserContextProvider} from '../contexts/UserContext';
function MyApp({ Component, pageProps}) {

  return (
    <div className="application">
    <UserContextProvider>
    <Component {...pageProps} />
    </UserContextProvider>
    </div>

  )
}

export default MyApp
