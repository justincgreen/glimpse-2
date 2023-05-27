import { useContext, useState, useEffect } from 'react';
import GlobalContext from '@/context/GlobalContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';

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
    isolatedBill,
    setIsolatedBill
   } = useContext(GlobalContext);
   
   //-----------------------------------------------------------------------------------------
   // update global bills balance every time billsTransaction array gets updated
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
    
  const toggleSettings = (e) => {        
    e.currentTarget.nextElementSibling.classList.add('is-active'); // targeting `.c-bill-item__icons-popover` element
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
                <div className="c-bill-item" key={bill.id}>
                  {/* <div className="c-bill-item__timestamp">{bill.timestamp}</div> */}
                  <span className="c-bill-item__due-date">Due date: {bill.dueDate}</span>
                  <span className="c-bill-item__description">{bill.description}</span>
                  <span className="c-bill-item__amount">${bill.amount}</span>
                  
                  <div className="c-bill-item__icons">
                    <span className="c-bill-item__icons-settings" onClick={toggleSettings}>    
                      <SettingsIcon sx={{ color: '#fff', fontSize: '24px' }} /> 
                    </span>
                    
                    <div className="c-bill-item__icons-popover" onClick={removePopoverOverlay}>                               
                      <span className="c-bill-item__delete" onClick={
                        () => {
                          deleteBillModal(bill.id, bill.description, bill.amount);
                        }
                      }>
                        <DeleteForeverIcon sx={{ color: '#ff4e4e', fontSize: '24px' }} />
                      </span>
                      <span className="c-bill-item__edit" onClick={
                        () => {
                          alert('edited - hook up');
                          //editExpense(item.id, item.description, item.amount)
                        }
                      }>
                        <EditIcon sx={{ color: '#55d4da', fontSize: '24px' }} />
                      </span>                                            
                    </div>                                                                             
                  </div>                                                      
                </div>
              )
            })
          }          
        </div>
        :
        'There are currently no bills'
      }      
    </>
  )
}

export default BillsList
