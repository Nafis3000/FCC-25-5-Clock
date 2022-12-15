import '../styles/globals.css'
import Script from 'next/script'


function MyApp({ Component, pageProps }) {
  return (
  <>
  <Component {...pageProps} />
  <Script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" />
  </>
  )
}

export default MyApp

