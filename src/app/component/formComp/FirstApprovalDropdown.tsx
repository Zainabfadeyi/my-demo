import React, { useState } from 'react';
import styles from '../../../styles/memoform.module.css';

const FirstApprovalDropdown : React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [selectedUser, setSelectedUser] = useState('');

  

  return (
    < div style={{width:"100%"}}>
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownLabel} onClick={toggleDropdown}>
        1st Approval <span className={styles.dropdownIcon}>{isOpen ? '▲' : '▼'}</span>
      </div>
    </div>
    {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownField}>
          <div className={styles.warningMessage}>
            Overwrite assignee, if not setup then use default user.
          </div>
            <label htmlFor="user" className={styles.userLabel}>User</label>
            <select id="user" name="user"  className={styles.userInput} onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}> 
              <option value="">Select User</option>
              <option value="user1">user 1</option>
              <option value="user2">user 2</option>
              <option value="user3">user 3</option>
              <option value="user4"> user 4</option>

            </select>
          </div>
          
        </div>
      )}
    
    </div>
  );
};

export default FirstApprovalDropdown;
