import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillForm = () => {
  const { 
    billTransactions,
    setBillTransactions,
    displayBillForm,
    setDisplayBillForm
  } = useContext(GlobalContext);
   
  const toggleBillForm = () => {
    setDisplayBillForm(!displayBillForm);
  }
   
  return (
    <h1>
      Bill form component - show/hide based on clicking add bill button
      <button className="button button--primary" onClick={toggleBillForm}>View Bills</button>
    </h1>
  )
}

export default BillForm
