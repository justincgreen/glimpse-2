import { useContext, useState, useEffect } from 'react';
import GlobalContext from '@/context/GlobalContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BillsList = () => {
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
    editBillForm,
    setEditBillForm,
    billPaidForm,
    setBillPaidForm,
    isolatedBill,
    setIsolatedBill
   } = useContext(GlobalContext);
   
   //-----------------------------------------------------------------------------------------
   // Update global bills balance every time billsTransaction array gets updated
   useEffect(() => {
     const billsTotalAmount = () => {        
       const billSum = billTransactions.reduce((accumulator, objects) => {
        return accumulator + parseFloat(objects.amount);
       }, 0);
       
       if(billSum > 0) {
         setGlobalBillsBalance(billSum);
         localStorage.setItem('local-bills-balance', JSON.stringify(billSum));
       }
     }
     billsTotalAmount();
   }, [billTransactions]);
   
   //-----------------------------------------------------------------------------------------    
   
   // Utility functions               
  const toggleSettings = (e) => {        
    e.currentTarget.nextElementSibling.classList.add('is-active'); // targeting `.c-bill-item__icons-popover` element and displaying it
  }
  
  const removePopoverOverlay = (e) => {
    if(e.target.classList.contains('c-bill-item__icons-popover')) {
      e.target.classList.remove('is-active'); 
    }    
  }    
  
  //-----------------------------------------------------------------------------------------
  
  // Modal functionality
  const deleteBillModal = (id, description, amount) => {
    setDisplayModal(true);
    setDeleteSingleBillForm(true);
    setIsolatedBill({id, description, amount});
  }
  
  const editBillModal = (id, description, amount, dueDate) => {
    setDisplayModal(true);
    setEditBillForm(true);
    setIsolatedBill({id, description, amount, dueDate});
  }
  
  const billPaidModal = (id, description, paid) => {
    setDisplayModal(true);
    setBillPaidForm(true);
    setIsolatedBill({id, description, paid});       
  }
  
  //-----------------------------------------------------------------------------------------
  
  return (
    <>
      {
        billTransactions.length > 0
        ?
        <div className="c-bills-list">
          {
            [...billTransactions].reverse().map((bill) => {
              return (
                <div className={ bill.paid ? 'c-bill-item is-paid' : 'c-bill-item'} key={bill.id}>
                  {/* <div className="c-bill-item__timestamp">{bill.timestamp}</div> */}
                  <span className="c-bill-item__due-date">Due date: {bill.dueDate}</span>                  
                  <div className="c-bill-item__description">{bill.description}</div>
                  <span className="c-bill-item__amount">${bill.amount}</span>
                  {
                    bill.paid ? <span className="c-bill-item__status-paid">Paid</span> : null
                  }
                  
                  <div className="c-bill-item__icons">
                    <span className="c-bill-item__icons-settings" onClick={toggleSettings}>    
                      <SettingsIcon sx={{ color: '#fff', fontSize: '30px' }} /> 
                    </span>
                    
                    <div className="c-bill-item__icons-popover" onClick={removePopoverOverlay}>                               
                      <span className="c-bill-item__icon-delete" onClick={
                        () => {
                          deleteBillModal(bill.id, bill.description, bill.amount);
                        }
                      }>
                        <DeleteForeverIcon sx={{ color: '#ff4e4e', fontSize: '30px' }} />
                      </span>
                      <span className="c-bill-item__icon-edit" onClick={
                        () => {                          
                          editBillModal(bill.id, bill.description, bill.amount, bill.dueDate)
                        }
                      }>
                        <EditIcon sx={{ color: '#55d4da', fontSize: '30px' }} />
                      </span>   
                      <span className="c-bill-item__icon-paid" onClick={
                        () => {
                         billPaidModal(bill.id, bill.description, bill.paid);
                        }
                      }>
                        <CheckCircleIcon sx={{ color: '#00b104', fontSize: '30px' }} />
                      </span>                                         
                    </div>                                                                             
                  </div>                                                      
                </div>
              )
            })
          }          
        </div>
        :
        <div className="c-bills-list__empty-message">There are currently no bills</div>
      }      
    </>
  )
}

export default BillsList
