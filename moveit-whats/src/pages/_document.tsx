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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}