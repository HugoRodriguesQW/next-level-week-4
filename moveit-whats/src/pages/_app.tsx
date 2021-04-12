import '../styles/global.css';
import {UserContextProvider} from '../contexts/UserContext';
import {Helmet} from 'react-helmet'
function MyApp({ Component, pageProps}) {

  return (
    <>
    <UserContextProvider>
    <Component {...pageProps} />
    </UserContextProvider>

    <Helmet>
      <title>Move.it - Pomodoro Timer</title>
      <meta charSet="UTF-8"/>
      <meta name="title" content="Moveit"/>
      <meta name="description" content="Inspirado na Técnica Pomodoro, ajuda você a se concentrar nas tarefas e gerenciar seu tempo." />
      <meta name="robots" content="index, nofollow"/>

      <meta itemProp="name" content="Move.it"/>
      <meta itemProp="description" content="Ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
      <meta itemProp="image" content="https://moveit.hugorodrigues.ml/banner.svg"/>

      <meta property="og:url" content="https://moveit.hugorodrigues.ml/"/>
      <meta property="og:site_name" content="Moveit"/>
      <meta property="og:title" content="Moveit"/>
      <meta property="og:description" content="Ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="https://moveit.hugorodrigues.ml/"/>
      <meta property="og:image:type" content="image/svg+xml"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>

      <meta name="twitter:url" content="https://moveit.hugorodrigues.ml/"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="Moveit"/>
      <meta name="twitter:description" content="Inspirado na Técnica Pomodoro, ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
      <meta name="twitter:image" content="https://moveit.hugorodrigues.ml/"/>  
    </Helmet>
    </>

  )
}

export default MyApp
