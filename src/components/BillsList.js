import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';

const BillsList = () => {
  const { 
    billTransactions,
    setBillTransactions
   } = useContext(GlobalContext);              
    
  const toggleSettings = (e) => {
    // targeting `.c-bill-item__icons-popover` element
    e.currentTarget.nextElementSibling.classList.add('is-active');
  }
  
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
                      <SettingsIcon sx={{ color: '#fff', fontSize: '28px' }} /> 
                    </span>
                    
                    <div className="c-bill-item__icons-popover">                               
                      <span className="c-bill-item__delete" onClick={
                        () => {
                          alert('deleted - hook up');
                          //deleteExpenseModal(item.id, item.amount)
                        }
                      }>
                        <DeleteForeverIcon sx={{ color: '#ff4e4e', fontSize: '28px' }} />
                      </span>
                      <span className="c-bill-item__edit" onClick={
                        () => {
                          alert('edited - hook up');
                          //editExpense(item.id, item.description, item.amount)
                        }
                      }>
                        <EditIcon sx={{ color: '#55d4da', fontSize: '28px' }} />
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
