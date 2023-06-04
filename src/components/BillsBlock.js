import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillsBlock = () => {
  const { 
    billTransactions,
    globalBillsBalance,
    currentMonth
   } = useContext(GlobalContext);
   
  return (
    <header className="c-bills-block">
      <h1 className="c-bills-block__title">
        { currentMonth } Bills List
      </h1>
      <h3 className="c-bills-block__amount">Total: ${ globalBillsBalance.toFixed(2) }</h3>
      <h3 className="c-bill-block__count">Count: {billTransactions.length}</h3>          
    </header>
  )
}

export default BillsBlock
