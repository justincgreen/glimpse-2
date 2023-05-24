import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillControls = () => {
  const { 
    displayBillForm,
    setDisplayBillForm,
    billTransactions,
    setBillTransactions
  } = useContext(GlobalContext);
   
  const toggleBillForm = () => {
    setDisplayBillForm(!displayBillForm);
  }
  
  const deleteBillTransactions = () => {
    setBillTransactions([]);
    localStorage.setItem('local-bill-transactions', '[]');
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
