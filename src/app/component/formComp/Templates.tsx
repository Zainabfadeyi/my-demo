import React, { useState } from 'react';
import styles from '../../../styles/memoform.module.css';

export interface TemplatesProps {
  onSelectDocument: (documentUrl: string) => void;
}

const Templates: React.FC<TemplatesProps> = ({ onSelectDocument }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  
  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);
  
    // Set the document URL based on the selected template
    if (selectedValue === 'General Template') {
      console.log('General Template selected');
      onSelectDocument('/general-template.docx');
    } else if (selectedValue === 'Default Memo Template') {
      console.log('Default Memo Template selected');
      onSelectDocument('/default-memo-template.docx');
    }
  };
  
    


  return (
    <div style={{ width: "100%" }}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownLabel} onClick={() => setIsOpen(!isOpen)}>
          Templates
        </div>
        {isOpen && (
          <div className={styles.dropdownContent}>
            <div className={styles.dropdownField}>
              <label htmlFor="template" className={styles.userLabel}>Templates</label>
              <select
                id="template"
                name="template"
                className={styles.userInput}
                onChange={handleTemplateChange}
                value={selectedUser}
              >
                <option value="">Select Template</option>
                <option value="General Template">General Template</option>
                <option value="Default Memo Template">Default Memo Template</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
