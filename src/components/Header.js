import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const Header = () => {
  const { 
     globalBillsBalance,
     currentMonth
   } = useContext(GlobalContext);
   
  return (
    <header className="c-header">
      <h1 className="c-header__title">
        <span className="c-header__title--month">{currentMonth} Bills</span>
        <span className="c-header__title--amount">${ globalBillsBalance.toFixed(2) }</span>
      </h1>
    </header>
  )
}

export default Header
