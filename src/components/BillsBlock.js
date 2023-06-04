import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillsBlock = () => {
  const { 
     globalBillsBalance,
     currentMonth
   } = useContext(GlobalContext);
   
  return (
    <header className="c-bills-block">
      <h1 className="c-bills-block__title">
        { currentMonth } Bills List
      </h1>
      <h3 className="c-bills-block__amount">Total Amount: ${ globalBillsBalance.toFixed(2) }</h3>
    </header>
  )
}

export default BillsBlock
