import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Script from 'next/script'
import Timer from '../components/Timer'


export default function Home() {
  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>FCC 25-5 Clock</title>
        <meta name="FreeCodeCamp 25-5 Clock" content="Coded By Nafis Anwar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Timer />
      </main>
        
    </div>
  <Script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" />
  </>
  )
}
