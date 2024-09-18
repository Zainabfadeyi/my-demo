import React, { useState, useEffect, useRef, FC, MouseEvent } from 'react';
import { IoIosMore } from 'react-icons/io';
import styles from '../../../styles/table.module.css';

interface ActionCatDropDownProps {
  onEdit: (categoryId: string) => void; // Pass categoryId for edit
  onDelete: (id: string) => void; // Accept categoryId for deletion
  categoryId: string; // The ID of the category to pass
}

const ActionCatDropDown: FC<ActionCatDropDownProps> = ({ onEdit, onDelete, categoryId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleClickOutside = (event: MouseEvent<Document>) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
    } else {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    };
  }, [dropdownOpen]);

  return (
    <div className={styles.actionDropdown} ref={dropdownRef}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        <IoIosMore />
      </div>
      {dropdownOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownItem} onClick={() => onEdit(categoryId)}>Edit</div> {/* Pass categoryId to onEdit */}
          <div className={styles.dropdownItem} onClick={() => onDelete(categoryId)}>Delete</div> {/* Pass categoryId to onDelete */}
        </div>
      )}
    </div>
  );
};

export default ActionCatDropDown;
