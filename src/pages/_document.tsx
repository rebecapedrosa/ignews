import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document{
  render() {
    return (
      <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet"/>

            <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
          <title>ig.news</title>
        </Head>
        <body>
          {/* Todo o conteudo da aplicação será
                carregado aqui! 
                substituto do <div className="root"></div>                
                */}
          <Main />
          {/* Onda fica os scripts js que o Next precisa pra carregar
           */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
