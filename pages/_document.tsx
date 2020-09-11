import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {/* http://necolas.github.io/normalize.css/ */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/normalize.css@8.0.1/normalize.css"
          />
          {/* https://terminalcss.xyz/ */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/terminal.css@0.7.1/dist/terminal.min.css"
          />
        </Head>
        <body className="terminal">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
