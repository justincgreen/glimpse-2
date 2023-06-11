import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';
import CurrentDate from '@/components/CurrentDate';

const BillsBlock = () => {
  const { 
    billTransactions,
    globalBillsBalance,
    currentMonth
   } = useContext(GlobalContext);
   
  return (
    <header className="c-bills-block">
      <h1 className="c-bills-block__title">
        { `${currentMonth} Bills List` }
      </h1>
      <CurrentDate />
      <h3 className="c-bills-block__amount">Total: ${ globalBillsBalance.toFixed(2) }</h3>
      <h3 className="c-bill-block__count">Number of bills: {billTransactions.length}</h3>                
    </header>
  )
}

export default BillsBlock
