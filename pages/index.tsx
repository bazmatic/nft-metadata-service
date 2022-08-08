import type { NextPage } from 'next'
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
        <code className={styles.code}>http://[host]/api/nft/[network]/[contract address]/[token ID]</code>
        <p>
          The permitted values for <b>[network]</b> are: <b>mainnet</b>, <b>ropsten</b>, <b>rinkeby</b>, <b>kovan</b>, <b>goerli</b>, <b>polygon</b>.
        </p>
        <p>
          The response will be a JSON object containing the metadata fields, plus:
          <ul>
            <li><b>owner</b> containing the address of the owner of the NFT</li>
            <li><b>timestamp</b> representing the time this data was fetched </li>
          </ul>
        </p>
        <p>
          Any extra metadata fields will be
        </p>
      </main>
    </div>
  )
}

export default Home
