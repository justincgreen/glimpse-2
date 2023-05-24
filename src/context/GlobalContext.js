import { useEffect, useState, createContext } from 'react';
import{ getCurrentMonth } from '@/helpers/getCurrentMonth';
import{ hydrateBillTransactions } from '@/helpers/hydrateBillTransactions';

const GlobalContext = createContext(null);

export const GlobalProvider = (props) => {
  const [globalBillsBalance, setGlobalBillsBalance] = useState(2);
  // const [billTransactions, setBillTransactions] = useState([{id: 1, description: 'Description', amount: 100, timestamp: '4-26-23'}]);
  const [billTransactions, setBillTransactions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth);
  
  // Display Bill Form
  const [displayBillForm, setDisplayBillForm] = useState(false);
  
  useEffect(() => {
    // Local storage hydration 
    // At the moment there is a flash of the previous state(s) before using the useEffect method to re-render the new states,
    // This is due to the current method of app hydration
    //-----------------------------
    setBillTransactions(hydrateBillTransactions);
  }, []);
  
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