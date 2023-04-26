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
        { currentMonth } Bills
      </h1>
      <h3 className="c-bills-block__amount">Total Amount: ${ globalBillsBalance.toFixed(2) }</h3>
      <h4>Description: Bills total, list of bills and add bills form</h4>
      <h4>Swap between bill form component and bills list component</h4>
    </header>
  )
}

export default BillsBlock
