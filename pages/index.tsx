import type { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Metadata Service</title>
        <meta name="description" content="Web service for fetching NFT metadata" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          NFT Metadata Service
        </h1>

        <p className={styles.description}>
          This is a web service for fetching NFT metadata. To request the metadata for an NFT, make a request to:
        </p>
        <code className={styles.code}>http://[host]:3000/api/nft/[contract address]/[token ID]</code>
        <p>
          <a target="_blank" href="/api/nft/0xf36446105ff682999a442b003f2224bcb3d82067/22">For an example, click here</a>
        </p>
      </main>
    </div>
  )
}

export default Home
