import React, { useEffect, useState } from 'react';
import axios from "../../../api/axios"; // Import Axios
import styles from '../../../styles/memoform.module.css';

interface ReviewerDropdownProps {
  onUserSelect: (user: string) => void;
}

const ReviewerDropdown: React.FC<ReviewerDropdownProps> = ({ onUserSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<string[]>([]); // State to hold usernames
  const [selectedUser, setSelectedUser] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/user/all'); 
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const user = e.target.value;
    setSelectedUser(user);
    onUserSelect(user); // Pass the selected user to the parent
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownLabel} onClick={toggleDropdown}>
          Receiver <span className={styles.dropdownIcon}>{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownField}>
            <label htmlFor="user" className={styles.userLabel}>User</label>
            <select
              id="reviewerName"
              name="reviewerName"
              className={styles.userInput}
              onChange={handleChange}
              value={selectedUser}
              required
            >
              <option value="">Select User</option>
              {users.map((user, index) => (
                <option key={index} value={user}>{user}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewerDropdown;
