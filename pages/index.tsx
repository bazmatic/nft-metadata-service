import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


type Props = { host: string | null };
export const getServerSideProps: GetServerSideProps<Props> = async context => ({ props: { host: context.req.headers.host || null } });

const Home: NextPage<Props> = ({host}) => {
  
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
          This is a web service for fetching NFT metadata and images.
        </p>
        <p>
          To fetch the metadata for an NFT, make a request to:
        </p>
        <Link href="/api/nft/nft/mainnet/0xD6F75a20Aa64634743D40fAfa88473020302C530/metadata/5">Hello</Link>
        <code className={styles.code}>http://{host}/api/nft/[network]/[contract address]/metadata/[token ID]</code>
        <p>
          To fetch the image for an NFT, make a request to:
        </p>
        <code className={styles.code}>http://{host}/api/nft/[network]/[contract address]/image/[token ID]</code>
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
      </main>
    </div>
  )
}

export default Home
