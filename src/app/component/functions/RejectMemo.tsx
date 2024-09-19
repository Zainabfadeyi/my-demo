import React, { FormEvent } from 'react';
import style from '../../../styles/reject.module.css';

interface RejectMemoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentNo?: string;
}

const RejectMemo: React.FC<RejectMemoProps> = ({ isOpen, onClose, documentNo , onConfirm}) => {
 
    if (!isOpen) {
        return null; // Render nothing if isOpen is false
      }
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onConfirm();
      };
  return (
    <div className={style.modal}>
      <div className={style.modalContainer}>
        <header style={{ textAlign: 'center', color: 'red', fontSize:"20PX" }}>Reject Memo</header>
        <div className={style.modalContent}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="reason" className={style.label}>
                Why do you want to reject? (Optional):
              </label>
              <textarea
                id="reason"
                name="reason"
                className={style.modaltextinput}
              />
            </div>
            <div className={style.modalButton}>
            <button
              className={style.button}
              style={{ marginRight: '8px' }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={style.Rejectbutton}
              type='submit'
              
             
            >
              Yes, Reject
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default RejectMemo;
