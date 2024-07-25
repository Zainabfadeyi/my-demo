import React, { useState } from 'react'
import styles from '../../../styles/memoform.module.css'

const Templates = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const [selectedUser, setSelectedUser] = useState('');
  
    
  
    return (
      < div style={{width:"100%"}}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownLabel} onClick={toggleDropdown}>
          Templates 
        </div>
      
    
          <div className={styles.dropdownContent}>
            <div className={styles.dropdownField}>
              <label htmlFor="user" className={styles.userLabel}>Templates</label>
              <select id="user" name="user"  className={styles.userInput} onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}> 
                <option value="user1">General Template</option>
                <option value="user2">Default Memo Template</option>
              </select>
            </div>
            
          </div>
          </div>
      
      </div>
    );
}

export default Templates