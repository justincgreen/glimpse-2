import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillsList = () => {
  const { 
    billTransactions,
    setBillTransactions
   } = useContext(GlobalContext);
   
  return (
    <div className="c-bills-list">
      {
        billTransactions.length > 0
        ?
        billTransactions.map((bill) => {
          return (
            <div className="c-bill-item" key={bill.id}>
              <div className="c-bill-item__timestamp">{bill.timestamp}</div>
              <span className="c-bill-item__description">{bill.description}</span>
              <span className="c-bill-item__amount">${bill.amount}</span>
            </div>
          )
        })
        :
        null
      }
      
    </div>
  )
}

export default BillsList
