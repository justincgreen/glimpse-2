import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

import Head from 'next/head'

// Components
import BillsBlock from '@/components/BillsBlock';
import BillControls from '@/components/BillControls';
import BillForm from '@/components/BillForm';
import BillsList from '@/components/BillsList';
import Footer from '@/components/Footer';
import Navicon from '@/components/Navicon';
import Navigation from '@/components/Navigation';
import Modal from '@/components/Modal';

export default function Home() {
  const { 
     globalBillsBalance,
     setGlobalBillsBalance,
     billTransactions,
     setBillTransactions,
     displayBillForm,
     displayModal
  } = useContext(GlobalContext);
   
  return (
    <>
      <Head>
        <title>Bills - Glimpse 2</title>
        <meta name="description" content="Bills list - Glimpse 2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
        <Navigation />
        
        <div className="page-wrapper"> 
          <Navicon />   
          <BillsBlock />
        
          <section className="section__container">
            <div className="section__content">
              {
                !displayBillForm
                ?
                <BillControls />
                :
                null
              }
              
              {
              displayBillForm
                ?
                <BillForm />
                :
                <BillsList />
              }            
            </div>                        
          </section>
          
          <Footer />
        </div>
        
        {
          displayModal ? <Modal /> : null
        }
      </main>
    </>
  )
}
