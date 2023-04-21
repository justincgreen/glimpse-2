import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

import Head from 'next/head'

export default function Home() {
  const { 
     globalBillsBalance,
     setGlobalBillsBalance
   } = useContext(GlobalContext);
   
  return (
    <>
      <Head>
        <title>Glimpse 2</title>
        <meta name="description" content="Glimpse 2, an app built to help manage bills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
        <div className="page-wrapper">
          <h1>Home Page</h1>
        </div>
      </main>
    </>
  )
}
