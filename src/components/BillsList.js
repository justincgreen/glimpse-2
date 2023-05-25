import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const BillsList = () => {
  const { 
    billTransactions,
    setBillTransactions
   } = useContext(GlobalContext);              
      
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
                    <MoreHorizIcon sx={{ color: '#fff', fontSize: '28px' }} />                                
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
