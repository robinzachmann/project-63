import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import 'src/global.scss'

const App = (props: AppProps): React.ReactElement => {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Project 63</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;1,100&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orelega+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Orelega+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
