import '../styles/global.css';
import {UserContextProvider} from '../contexts/UserContext';
import { MenuBar } from '../components/MenuBar';


function MyApp({ Component, pageProps}) {

  return (
    <UserContextProvider>
    <MenuBar />
    <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
