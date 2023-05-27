import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillControls = () => {
  const { 
    globalBillsBalance,
    setGlobalBillsBalance,
    displayBillForm,
    setDisplayBillForm,
    billTransactions,
    setBillTransactions,
    displayModal,
    setDisplayModal,
    deleteAllBillsForm,
    setDeleteAllBillsForm
  } = useContext(GlobalContext);
   
  const toggleBillForm = () => {
    setDisplayBillForm(!displayBillForm);
  }
  
  const deleteAllBillsModal = () => {
    setDisplayModal(true);
    setDeleteAllBillsForm(true);
  }
   
  return (
    <div className="button--group">
      <button className="button button--primary" onClick={toggleBillForm}>Add Bill</button>
      {
        billTransactions < 1 
        ?
        <button className="button button--primary" disabled>Delete All Bills</button>
        :
        <button className="button button--primary" onClick={deleteAllBillsModal}>Delete All Bills</button>
      }
      
    </div>
  )
}

export default BillControls
