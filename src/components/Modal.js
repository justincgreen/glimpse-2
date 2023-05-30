import { useContext, useState } from 'react';
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
    editBillForm,
    setEditBillForm,
    isolatedBill,
    setIsolatedBill
   } = useContext(GlobalContext);
   
   //-----------------------------------------------------------------------------------------
   
   // Isolated component states
   const [editBillDescription, setEditBillDescription] = useState(isolatedBill.description);
   const [editBillAmount, setEditBillAmount] = useState(isolatedBill.amount);
   
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
  
  // Edit Bill - need to double check logic in this section - mainly this function updatedGlobalBillsBalance = ()
  const captureBillDescription = (e) => {
    setEditBillDescription(e.target.value);
  }
  
  const captureBillAmount = (e) => {
    setEditBillAmount(e.target.value);
  }
  
  const saveUpdatedBill = () => {    
   // Update object, updateBill function returns a new array
   const updateBill= billTransactions.map((obj) => {
    return obj.id === isolatedBill.id ? { ...obj, description: editBillDescription, amount: editBillAmount } : obj 
   });
   
   setBillTransactions(updateBill);
   localStorage.setItem('local-bill-transactions', JSON.stringify(updateBill));
   
   // Update global bills balance - NEED TO WORK ON THIS FUNCTION   
    const updatedGlobalBillsBalance = () => {
      if(isolatedBill.amount === editBillAmount) { // which means the amount hasn't been changed, close modal
        // Close Modal
        setDisplayModal(false);
        setEditBillForm(false);
      }
      else if(isolatedBill.amount !== editBillAmount){
       // Add the transactions objects amounts together to get the updated globalExpenses amount
       // https://bobbyhadz.com/blog/javascript-get-sum-of-array-object-values
       const sum = updateBill.reduce((accumulator, objects) => {
        return accumulator + parseFloat(objects.amount);
       }, 0);
        
        //setGlobalExpenses(sum);
        //localStorage.setItem('local-expenses-amount', JSON.stringify(sum.toFixed(2))); 
        
        // Update global bills balance
        // What happens if the number is greater than previous number then add otherwise if it's lower subtract from globalbillsbalance state
        const updatedGlobalBalance = parseFloat(globalIncome) - parseFloat(sum); // globalIncome doesnt exist remove when ready
        setGlobalBillsBalance(updatedGlobalBillsBalance.toFixed(2));
        localStorage.setItem('local-bills-balance', JSON.stringify(updatedGlobalBillsBalance.toFixed(2)));
        
        // Close Modal
        setDisplayModal(false);
        setEditBillForm(false);
      }
    }
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
    setEditBillForm(false);
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
        <h3 className="c-modal__form-heading">Delete All Bills?</h3>
        <div className="button--group">
          <button className="button" onClick={deleteAllBills}>Yes</button>
          <button className="button" onClick={closeModal}>No</button>
        </div>
      </div>
    )
  }
  
  const renderEditBillForm = () => {
    return (
      <div className="c-modal__edit-bill-form">
        <h3 className="c-modal__form-heading">Edit Bill</h3>
        <label className="c-modal__form-label">Description</label>
        <input type="type" placeholder="Enter Description" className="c-modal__edit-bill-input" onChange={captureBillDescription} value={editBillDescription} />
        <label className="c-modal__form-label">Amount</label>
        <input type="number" min="0" placeholder="Enter Amount" className="c-modal__edit-bill-input" onChange={captureBillAmount} value={editBillAmount} />
        <button className="button" onClick={saveUpdatedBill}>Save</button>
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
        
        {
          editBillForm ? renderEditBillForm() : null
        }
      </div>
    </div>
  )
}

export default Modal