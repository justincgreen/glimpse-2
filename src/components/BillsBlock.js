import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const BillsBlock = () => {
  const { 
     currentMonth
   } = useContext(GlobalContext);
   
  return (
    <header className="c-bills-block">
      <h1 className="c-bills-block__title">
        { currentMonth } Bills
      </h1>
      <span>Description: Bills total, list of bills and add bills form</span>
    </header>
  )
}

export default BillsBlock
