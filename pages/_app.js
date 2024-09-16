
import '../styles/bootstrap.min.css';
import '../styles/globals.css';

import React from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    < >
        <Component {...pageProps} />

   </>
)
}

export default MyApp;