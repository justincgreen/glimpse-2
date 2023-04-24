import { useState, createContext } from 'react';

const GlobalContext = createContext(null);

export const GlobalProvider = (props) => {
  const [globalBillsBalance, setGlobalBillsBalance] = useState(2);
  const [billTransactions, setBillTransactions] = useState([]);
  
  return (
    <GlobalContext.Provider value={{      
      globalBillsBalance,
      setGlobalBillsBalance,
      billTransactions,
      setBillTransactions
    }}>
    {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;