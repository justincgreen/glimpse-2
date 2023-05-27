// Get global bills balance from local storage
export const hydrateBillsBalance = () => {
  const data = localStorage.getItem('local-bills-balance');
  
  if(data) {
    return JSON.parse(data);
  }else {
    return 0;
  }  
}