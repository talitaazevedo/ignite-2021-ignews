// é carregado uma unica vez na minha aplicação
import Document, { Html, Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@700;900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="shortcut icon"
                        href="favicon.ico"
                        type="image/png"
                    />
                    <title>ig.news</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
