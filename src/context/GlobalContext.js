import { useState, createContext } from 'react';

const GlobalContext = createContext(null);

export const GlobalProvider = (props) => {
  // Bills Balance
  const [globalBillsBalance, setGlobalBillsBalance] = useState(0);
  
  return (
    <GlobalContext.Provider value={{      
      globalBillsBalance,
      setGlobalBillsBalance
    }}>
    {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;