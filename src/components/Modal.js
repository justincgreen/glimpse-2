import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';
import CancelIcon from '@mui/icons-material/Cancel';

const Modal = () => {
  // Context
  const {
    globalBillsBalance,
    setGlobalBillsBalance, 
    billTransactions,
    setBillTransactions,
    displayModal,
    setDisplayModal,
    deleteSingleBillForm,
    setDeleteSingleBillForm,
    deleteAllBillsForm,
    setDeleteAllBillsForm,
    isolatedBill,
    setIsolatedBill
   } = useContext(GlobalContext);
   
  //-----------------------------------------------------------------------------------------
  
  // Delete single bill item 
  const deleteSingleBill = () => {
    const filterTransactions = billTransactions.filter((element) => {
      return element.id !== isolatedBill.id;		  
    });
    
    // Update bill transactions array
    setBillTransactions(filterTransactions);
    localStorage.setItem('local-bill-transactions', JSON.stringify(filterTransactions));
    
    // Update global bills total amount - TODO
   const updatedGlobalBillsBalance = parseFloat(globalBillsBalance) - parseFloat(isolatedBill.amount);
   setGlobalBillsBalance(updatedGlobalBillsBalance);
   localStorage.setItem('local-bills-balance', JSON.stringify(updatedGlobalBillsBalance));
    
    setIsolatedBill({}); // need to reset this state so new value can be used later
    setDisplayModal(false);
    setDeleteSingleBillForm(false);
  }
  
  //-----------------------------------------------------------------------------------------
  
  // Delete all bill items
  const deleteAllBills = () => {
    setBillTransactions([]);
    setGlobalBillsBalance(0);
    localStorage.setItem('local-bill-transactions', '[]');
    localStorage.setItem('local-bills-balance', '0');
    setDisplayModal(false);
    setDeleteAllBillsForm(false);
  }
  
  //-----------------------------------------------------------------------------------------
   
  // Close modal
  const closeModal = () => {
    const activePopover = document.querySelector('.c-bill-item__icons-popover.is-active');
    
    if(activePopover) {
      activePopover.classList.remove('is-active');  
    }
    
    setIsolatedBill({}); // need to reset this state so new value can be used later
    setDisplayModal(false);
    setDeleteSingleBillForm(false);
    setDeleteAllBillsForm(false);
  }
  
  //-----------------------------------------------------------------------------------------
   
  // Render form functions
  const renderSingleBillForm = () => {
    return (
      <div className="c-modal__delete-single-bill-form">
        <h3 className="c-modal__form-heading">Delete Bill?</h3>
        <div className="button--group">
          <button className="button" onClick={deleteSingleBill}>Yes</button>
          <button className="button" onClick={closeModal}>No</button>
        </div>
      </div>
    )
  }
  
  const renderAllBillsForm = () => {
    return (
      <div className="c-modal__delete-all-bills-form">
        <h3 className="c-modal__form-heading">Delete Bill?</h3>
        <div className="button--group">
          <button className="button" onClick={deleteAllBills}>Yes</button>
          <button className="button" onClick={closeModal}>No</button>
        </div>
      </div>
    )
  }
  
  //-----------------------------------------------------------------------------------------      
   
  return (
    <div className="c-modal">
      Modal
      <div className="c-modal__wrapper">
        <button className="button button__close-modal" onClick={closeModal}>
          <CancelIcon sx={{fontSize: '30px', color: '#ff4e4e'}} />
        </button>		
        
        {
          deleteSingleBillForm ? renderSingleBillForm() : null
        }
        
        {
          deleteAllBillsForm ? renderAllBillsForm() : null
        }
      </div>
    </div>
  )
}

export default Modal