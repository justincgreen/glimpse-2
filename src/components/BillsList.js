import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

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
            billTransactions.map((bill) => {
              return (
                <div className="c-bill-item" key={bill.id}>
                  <div className="c-bill-item__timestamp">{bill.timestamp}</div>
                  <span className="c-bill-item__description">{bill.description}</span>
                  <span className="c-bill-item__amount">${bill.amount}</span>
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
