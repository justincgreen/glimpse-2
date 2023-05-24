// Get transactions from local storage if available
export const hydrateBillTransactions = () => {
  const data = localStorage.getItem('local-bill-transactions');
  
  if(data) {
    return JSON.parse(data);
  }else {
    return [];
  }  
}