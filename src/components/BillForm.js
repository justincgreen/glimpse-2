import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillForm = () => {
  const { 
     billTransactions,
     setBillTransactions
   } = useContext(GlobalContext);
   
  return (
    <h1>
      Bill form component - show/hide based on clicking add bill button
    </h1>
  )
}

export default BillForm
