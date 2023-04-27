import { useState, createContext } from 'react';
import{ getCurrentMonth } from '@/helpers/getCurrentMonth';

const GlobalContext = createContext(null);

export const GlobalProvider = (props) => {
  const [globalBillsBalance, setGlobalBillsBalance] = useState(2);
  const [billTransactions, setBillTransactions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth);
  
  // Display Bill Form
  const [displayBillForm, setDisplayBillForm] = useState(false);
  
  return (
    <GlobalContext.Provider value={{      
      globalBillsBalance,
      setGlobalBillsBalance,
      billTransactions,
      setBillTransactions,
      currentMonth,
      setCurrentMonth,
      displayBillForm,
      setDisplayBillForm
    }}>
    {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;