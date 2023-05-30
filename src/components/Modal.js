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
   const [editBillDueDate, setEditBillDueDate] = useState(isolatedBill.dueDate);
   
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
  
  // Delete single bill item 
  const deleteSingleBill = () => {
    const filterTransactions = billTransactions.filter((element) => {
      return element.id !== isolatedBill.id;		  
    });
    
    // Update bill transactions array
    setBillTransactions(filterTransactions);
    localStorage.setItem('local-bill-transactions', JSON.stringify(filterTransactions));
    
    // Update global bills total amount
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
  
  // Edit Bill
  const captureBillDescription = (e) => {
    setEditBillDescription(e.target.value);
  }
  
  const captureBillAmount = (e) => {
    setEditBillAmount(e.target.value);
  }
  
  const captureBillDueDate = (e) => {
    setEditBillDueDate(e.target.value);
  }
  
  const saveUpdatedBill = () => {    
   // Update object, updateBill function returns a new array
   // TODO: Need to add the ability to edit the due date - need to revert dueDate to match default calendar ouput and then resave back
   // to reformatted version so take May 30, 2023 into 2023-5-30 and back into this format May 30, 2023
   // also add dueDate.editBillDueDate property to below
   const updateBill= billTransactions.map((obj) => {
    return obj.id === isolatedBill.id ? { ...obj, description: editBillDescription, amount: editBillAmount } : obj 
   });
   
   // Save updated bill transactions array
   setBillTransactions(updateBill);
   localStorage.setItem('local-bill-transactions', JSON.stringify(updateBill));      
   
   // Update global bills balance  
    const updatedGlobalBillsBalance = () => {
      if(isolatedBill.amount === editBillAmount) { // which means the amount hasn't been changed, close modal
        closeModal();
      }
      else if(isolatedBill.amount !== editBillAmount){
        // Add the transactions objects amounts together to get the updated globalBillsBalance amount
        // https://bobbyhadz.com/blog/javascript-get-sum-of-array-object-values
        const sum = updateBill.reduce((accumulator, objects) => {
          return accumulator + parseFloat(objects.amount);
        }, 0);
        
        // Update global bills balance with sum value
        setGlobalBillsBalance(sum);
        localStorage.setItem('local-bills-balance', JSON.stringify(sum));
        
        // Close Modal
        closeModal();
      }
    }    
    updatedGlobalBillsBalance();
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
        {/* <input type="date" placeholder="Enter Date" className="c-modal__edit-bill-input" onChange={captureBillDueDate} value={editBillDueDate} /> */}
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