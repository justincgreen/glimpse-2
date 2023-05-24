import { useState, useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';
import{ generateID } from '@/helpers/generateID';
import{ currentDate } from '@/helpers/currentDate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BillForm = () => {
  const { 
    billTransactions,
    setBillTransactions,
    displayBillForm,
    setDisplayBillForm
  } = useContext(GlobalContext);
  
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [formDescription, setFormDescription] = useState('');
  const [formAmount, setFormAmount] = useState(0);
  const [formDate, setFormDate] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  
  // Toggle bill form 
  const toggleBillForm = () => {
    setDisplayBillForm(!displayBillForm);
  }
  
  //---------------------------------------------------------------------------------------
  
  // Transaction flow
  const handleTransaction = () => {
    const formattedDate = new Date(formDate).toLocaleDateString('en-US', {
      timeZone: 'UTC',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const currentTransaction = {
      id: generateID(),
      description: formDescription,
      amount: formAmount,
      dueDate: formattedDate,
      timestamp: currentDate()
    }
    
    // Add new transaction to main bill transactions array & local storage
    const newTransaction = [...billTransactions, currentTransaction];
    setBillTransactions(newTransaction);
    localStorage.setItem('local-bill-transactions', JSON.stringify(newTransaction));
  }
  
  //---------------------------------------------------------------------------------------
  
  // Capture form data functions
  const captureFormDescription = (e) => {
    setFormDescription(e.target.value);
  }
  
  const captureFormAmount = (e) => {
    setFormAmount(e.target.value);
  }
  
  const captureFormDate = (e) => {
    setFormDate(e.target.value);
  }
  
  const captureFormData = (e) => {    
    e.preventDefault();
    const billDescription = document.querySelector('.c-bill-form__input--description');
    const billAmount = document.querySelector('.c-bill-form__input--amount');
    const billDueDate = document.querySelector('.c-bill-form__input--date');
    const formInputs = document.querySelectorAll('.c-bill-form__input');
    
    if(billDescription.value === '' || billAmount.value === '' || billDueDate.value === '') {
      alert('Enter a bill description, amount and due date');
    } else {
      formInputs.forEach(input => input.value = ''); // Clear input fields on submit
      setDisableSubmitBtn(true);
      console.log(formDescription)
      console.log(formAmount)
      console.log(formDate) 
      
      // Handle transaction
      handleTransaction();
      
      // Success message
      setSuccessMsg(true);
      
      // Add success message, enable submit button after success message clears
      setTimeout(() => {
        setDisableSubmitBtn(false);
        setSuccessMsg(false);
      }, 1500);
    }                 
  }
  
  const renderForm = () => {
    return (
      <form className="c-bill-form__form">
        <label className="c-bill-form__label">Description</label>
        <input type="text" placeholder="Enter description" className="c-bill-form__input c-bill-form__input--description" onChange={captureFormDescription} />        
        <label className="c-bill-form__label">Amount</label>
        <input type="number" min="0" placeholder="Enter Amount" className="c-bill-form__input c-bill-form__input--amount" onChange={captureFormAmount} />
        <label className="c-bill-form__label">Due Date</label>
        <input type="date" className="c-bill-form__input c-bill-form__input--date" onChange={captureFormDate} />
        {
          disableSubmitBtn 
          ?
          <button className="button" disabled>Add Expense</button>
          :
          <button className="button" onClick={captureFormData}>Add Expense</button>
        }
      </form>
    )
  }
  
  const renderSuccess = () => {
    return (
      <div className="c-bill-form__success-message">
        <div className="c-bill-form__success-message-inner">
          <CheckCircleIcon sx={{ color: '#03e084', fontSize: '100px' }} />
          <h2>Success</h2>
        </div>
      </div>
    )
  }
   
  return (
    <>
      <div className="c-bill-form__upper">
        <h2 className="c-bill-form__title">Add Bill</h2>
        <button className="button button--primary" onClick={toggleBillForm}>View Bills</button>
      </div>
      
      {
        renderForm()
      }
      
      {
        successMsg ? renderSuccess() : null
      }     
    </>
  )
}

export default BillForm
