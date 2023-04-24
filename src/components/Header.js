import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';

const Header = () => {
  const { 
     globalBillsBalance
   } = useContext(GlobalContext);
   
  return (
    <header className="c-header">
      <span className="c-header__title">
        <span className="c-header__title-month">This Month</span>
        ${globalBillsBalance}
      </span>
    </header>
  )
}

export default Header
