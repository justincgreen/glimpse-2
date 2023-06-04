import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

import Head from 'next/head'

// Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navicon from '@/components/Navicon';
import Navigation from '@/components/Navigation';

// Chart
import { Chart as ChartJS } from 'chart.js/auto';
import { Pie } from "react-chartjs-2";

// Helpers
import{ generateRandomColors } from '@/helpers/generateRandomColors';

export default function Home() {
  const { 
     globalBillsBalance,
     setGlobalBillsBalance,
     billTransactions
  } = useContext(GlobalContext);
    
  const billAmounts = billTransactions.map(bill => bill.amount);
  const billDescriptions = billTransactions.map(bill => bill.description);
  
  //---------------------------------------------------------------------------------------
  
  const chartOptions = {
    plugins: {  
      legend: {
        position: 'bottom', // workaround for label spacing
        title: { display: true, padding: 15 }, // workaround for label spacing
        labels: {
          color: 'white',
          font: {
            size: 16
          }
        }
      }
    },
    responsive: true
  }
          
  const chartData = {
    labels: billDescriptions,
    datasets: [
      {
        data: billAmounts,
        label: '$',
        backgroundColor: generateRandomColors(billAmounts.length)
      }
    ]
  }; 
  
  //---------------------------------------------------------------------------------------   
   
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
          
          <div className="chart-wrapper">
            <Pie options={chartOptions} data={chartData} />
          </div>
          <Footer />
        </div>
      </main>
    </>
  )
}
