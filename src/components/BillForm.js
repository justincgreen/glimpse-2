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
      Bill form component - TODO: ADD FORM
      <button className="button button--primary" onClick={toggleBillForm}>View Bills</button>
    </h1>
  )
}

export default BillForm
