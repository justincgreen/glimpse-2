import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

import Head from 'next/head'

// Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navicon from '@/components/Navicon';
import Navigation from '@/components/Navigation';

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
        <Navigation />
        
        <div className="page-wrapper">        
          <Header />          
          <Navicon />
          <Footer />
        </div>
      </main>
    </>
  )
}
