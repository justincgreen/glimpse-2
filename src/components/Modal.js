import { useContext } from 'react';
import GlobalContext from '@/context/GlobalContext';
import CancelIcon from '@mui/icons-material/Cancel';

const Modal = () => {
  const { 
    billTransactions,
    setBillTransactions,
    displayModal,
    setDisplayModal,
    deleteSingleBillForm,
    setDeleteSingleBillForm
   } = useContext(GlobalContext);
   
   const renderSingleBillForm = () => {
     return (
       <div className="c-modal__delete-single-bill-form">
       Delete Single bill form
       </div>
     )
   }
   
   const closeModal = () => {
     const activePopover = document.querySelector('.c-bill-item__icons-popover.is-active');
     activePopover.classList.remove('is-active');
     setDisplayModal(false);
     setDeleteSingleBillForm(false);
   }
   
  return (
    <div className="c-modal">
      Modal
      <div className="c-modal__wrapper">
        <button className="button button__close-modal" onClick={closeModal}>
          <CancelIcon sx={{fontSize: '30px', color: '#ff4e4e'}} />
        </button>		
        
        {
          deleteSingleBillForm ? renderSingleBillForm() : null
        }
      </div>
    </div>
  )
}

export default Modal