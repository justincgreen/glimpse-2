import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillControls = () => {
  const { 
    globalBillsBalance,
    setGlobalBillsBalance,
    displayBillForm,
    setDisplayBillForm,
    billTransactions,
    setBillTransactions
  } = useContext(GlobalContext);
   
  const toggleBillForm = () => {
    setDisplayBillForm(!displayBillForm);
  }
  
  const deleteBillTransactions = () => {
    // TODO - add modal functionality
    setBillTransactions([]);
    setGlobalBillsBalance(0);
    localStorage.setItem('local-bill-transactions', '[]');
    localStorage.setItem('local-bills-balance', '0');
  }
   
  return (
    <div className="button--group">
      <button className="button button--primary" onClick={toggleBillForm}>Add Bill</button>
      {
        billTransactions < 1 
        ?
        <button className="button button--primary" disabled>Delete All Bills</button>
        :
        <button className="button button--primary" onClick={deleteBillTransactions}>Delete All Bills</button>
      }
      
    </div>
  )
}

export default BillControls
