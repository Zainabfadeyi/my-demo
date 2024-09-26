import React, { useEffect, useState } from 'react';
import axios from "../../../api/axios"; // Import Axios
import styles from '../../../styles/memoform.module.css';
import { RootState } from '../../../api/store';
import { UseSelector } from '../../../api/hook';

interface LocationProps {
  onSelect: (user: string) => void;
}

const Location: React.FC<LocationProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<string[]>([]); // State to hold usernames
  const [selectedUser, setSelectedUser] = useState('');

  const accessToken = UseSelector((state: RootState) => state.auth.user?.accessToken);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/locations/departments',{
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass access token in headers
          }}

        ); 
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
    onSelect(user); // Pass the selected user to the parent
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownLabel} onClick={toggleDropdown}>
          Department <span className={styles.dropdownIcon}>{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownField}>
            
            <select
              id="reviewerName"
              name="reviewerName"
              className={styles.userInput}
              onChange={handleChange}
              value={selectedUser}
              required
            >
              <option value="">Select Location</option>
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

export default Location;
