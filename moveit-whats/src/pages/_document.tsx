import Document,  {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return  (
      <Html lang="pt-br">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          <meta name="theme-color" content="#5965e0" />

          <title>Move.it - Pomodoro Timer</title>
          
          <meta charSet="UTF-8"/>
          <meta name="title" content="Moveit"/>
          <meta name="description" content="Inspirado na Técnica Pomodoro, ajuda você a se concentrar nas tarefas e gerenciar seu tempo." />
          <meta name="robots" content="index, nofollow"/>

          <meta itemProp="name" content="Move.it"/>
          <meta itemProp="description" content="Ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
          <meta itemProp="image" content="/banner.png"/>

          <meta property="og:url" content="https://moveit.hugorodrigues.ml/"/>
          <meta property="og:site_name" content="Moveit"/>
          <meta property="og:title" content="Moveit"/>
          <meta property="og:description" content="Ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
          <meta property="og:type" content="website"/>
          <meta property="og:image" content="/banner.png"/>
          <meta property="og:image:type" content="image/png"/>
          <meta property="og:image:width" content="1200"/>
          <meta property="og:image:height" content="630"/>

          <meta name="twitter:url" content="https://moveit.hugorodrigues.ml/"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="Moveit"/>
          <meta name="twitter:description" content="Inspirado na Técnica Pomodoro, ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
          <meta name="twitter:image" content="/banner.png"/>  
          
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
