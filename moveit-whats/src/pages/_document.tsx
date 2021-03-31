import Document,  {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return  (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />

          <meta httpEquiv="origin-trial" content="AqyKmy3iO4yBJwtEuP6OuxmtkakkfThRMrr2c0UZ1Gc+VzhEgVUVxLJfuHW3/yyyR59NnUNv5tC4iaLSc2eFMg8AAAB2eyJvcmlnaW4iOiJodHRwczovL25sdzQtaHVnb3JvZHJpZ3Vlc3F3LnZlcmNlbC5hcHA6NDQzIiwiZmVhdHVyZSI6IlVucmVzdHJpY3RlZFNoYXJlZEFycmF5QnVmZmVyIiwiZXhwaXJ5IjoxNjMzNDc4Mzk5fQ==" />
        
          {/*  SEO */}
          <link rel="canonical" href="https://nlw4-hugorodriguesqw.vercel.app/"/>
          <meta name="description" content="Inspirado na Técnica Pomodoro, ajuda você a se concentrar nas tarefas e gerenciar seu tempo." />
          <meta name="robots" content="index, nofollow, noimageindex"/>
          <meta httpEquiv="content-type"  content="text/html;charset=utf-8"/>
          {/* SEO - Google+ */}
          <meta itemProp="name" content="Move.it"/>
          <meta itemProp="description" content="Ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
          <meta itemProp="image" content="https://nlw4-hugorodriguesqw.vercel.app/banner.svg"/>
          {/* SEO - Facebook */}
          <meta property="og:url" content="https://nlw4-hugorodriguesqw.vercel.app/"/>
          <meta property="og:site_name" content="Move.it"/>
          <meta property="og:title" content="Move.it"/>
          <meta property="og:description" content="Ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
          <meta property="og:type" content="website"/>
          <meta property="og:image" content="https://nlw4-hugorodriguesqw.vercel.app/banner.svg"/>
          <meta property="og:image:type" content="image/svg+xml"/>
          <meta property="og:image:width" content="1200"/>
          <meta property="og:image:height" content="630"/>

           {/* SEO - Twitter */}
          <meta name="twitter:url" content="https://nlw4-hugorodriguesqw.vercel.app/"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="Move.it"/>
          <meta name="twitter:description" content="Inspirado na Técnica Pomodoro, ajuda você a se concentrar nas tarefas e gerenciar seu tempo."/>
          <meta name="twitter:image" content="https://nlw4-hugorodriguesqw.vercel.app/banner.svg"/>
          {/* SEO - END */}    
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
