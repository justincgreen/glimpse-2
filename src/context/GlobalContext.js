import { useEffect, useState, createContext } from 'react';
import{ getCurrentMonth } from '@/helpers/getCurrentMonth';
import{ hydrateBillsBalance } from '@/helpers/hydrateBillsBalance';
import{ hydrateBillTransactions } from '@/helpers/hydrateBillTransactions';

const GlobalContext = createContext(null);

export const GlobalProvider = (props) => {
  const [globalBillsBalance, setGlobalBillsBalance] = useState(0);
  const [billTransactions, setBillTransactions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth);
  
  // Display Bill Form
  const [displayBillForm, setDisplayBillForm] = useState(false);
  
  // Modal
  const [displayModal, setDisplayModal] = useState(false);  
  const [deleteSingleBillForm, setDeleteSingleBillForm] = useState(false);  
  const [deleteAllBillsForm, setDeleteAllBillsForm] = useState(false);  
  const [isolatedBill, setIsolatedBill] = useState({});  
  
  useEffect(() => {
    // Local storage hydration 
    // At the moment there is a flash of the previous state(s) before using the useEffect method to re-render the new states,
    // This is due to the current method of app hydration
    //-----------------------------
    setGlobalBillsBalance(hydrateBillsBalance);
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
      setDisplayBillForm,
      displayModal,
      setDisplayModal,
      deleteSingleBillForm,
      setDeleteSingleBillForm,
      deleteAllBillsForm,
      setDeleteAllBillsForm,
      isolatedBill,
      setIsolatedBill
    }}>
    {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;