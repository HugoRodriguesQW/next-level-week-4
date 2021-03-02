import '../styles/global.css';
import {UserContextProvider} from '../contexts/UserContext';
import { LeftBarMenu } from '../components/LeftBarMenu';


function MyApp({ Component, pageProps}) {

  return (
    <UserContextProvider>
    <LeftBarMenu />
    <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
