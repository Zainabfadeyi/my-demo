import React, { useEffect, useState } from 'react'
import styles from '../../../styles/memoform.module.css';
import { Field } from 'formik';
import axios from '../../../api/axios';
import { RootState } from '../../../api/store';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineForm } from 'react-icons/ai';
import LoadingSpinner from '../chart/LoadingSpinner';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const EditMemo:React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        subject: '',
        recipient: '',
        category: '',
        sender: '',
        date: '',
        description: '',
        department: '',
        landmark: '',
        reviewerName: '',
      });
      const { documentNo } = useParams<{ documentNo: string }>();
      const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<string[]>([]); 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const [categories, setCategories] = useState<{ id: string; categoryName: string }[]>([]);
      const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
      const navigate=useNavigate()
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get('/api/v1/categories', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            setCategories(response.data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, [accessToken]);
      useEffect(() => {
        const fetchMemoByDocumentNo = async () => {
          try {
            const response = await axios.get(`/api/v1/memo/getByDocumentNo/${documentNo}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            setFormData(response.data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchMemoByDocumentNo();
      }, [accessToken]);
     
     
       // Handle memo update
  const handleUpdateMemo = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/api/v1/memo/editByDocumentNo/${documentNo}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('Memo updated successfully');
      await delay(2000);
    } catch (error) {
      console.error('Error updating memo:', error);
      alert('Error updating memo');
    }finally {

      setIsLoading(false);
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleCancel=()=>{
    navigate('/all-request')
  }

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
  if (isLoading) {
    return <LoadingSpinner size={50} message="Editing your memo..." />;
  }
    return (
        <form className={styles.formGroup}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: "#1976D2", width: "15%" , fontSize:"20px", columnGap:"10px", alignItems:"center", display:"flex"}}>
            <div style={{fontWeight:"900", fontSize:"23px"}}>
            <AiOutlineForm />
            </div>
            <div>
          {documentNo}
          </div>
          </div>
            <div className={styles.hr}></div>
          </div>
    
          <div className={styles.fieldCover}>
            <div style={{ padding: '12px', margin: '-20px', fontWeight: '900', backgroundColor: '#F9FBFC' }}>
              Memo Details
            </div>
    
            <div className={styles.fieldContent}>
              <div className={styles.formField}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className={styles.formInput}
                  value={formData.subject || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
    
              <div className={styles.field}>
                <div className={styles.formField}>
                  <label htmlFor="recipient" className={styles.label}>Recipient</label>
                  <input
                    id="recipient"
                    name="recipient"
                    type="text"
                    className={styles.formInput}
                    value={formData.recipient}
                    onChange={handleInputChange}
                    required
                  />
                </div>
    
                <div className={styles.formField}>
                  <label htmlFor="category" className={styles.label}>Category Type</label>
                  <select
                    
                    name="category"
                    className={styles.formInput}
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" label="Select category" />
                    {categories.map((category) => (
                      <option key={category.categoryName} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
    
              <div className={styles.field}>
                <div className={styles.formField}>
                  <label htmlFor="from" className={styles.label}>From</label>
                  <input
                    id="sender"
                    name="sender"
                    type="text"
                    className={styles.formInput}
                    value={formData.sender}
                    onChange={handleInputChange}
                    required
                  />
                </div>
    
                <div className={styles.formField}>
                  <label htmlFor="date" className={styles.label}>Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className={styles.formInput}
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
    
              <div className={styles.formField}>
                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className={styles.input}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          
          

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
            
              name="department"
              className={styles.userInput}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  department: e.target.value, // Correctly update state with the selected value
                });
              }}
              value={formData.department}
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
    <div style={{ textAlign: 'right', marginTop: '20px' , justifyContent:"flex-end", display:"flex", alignItems:"center"}}>
      <button onClick={handleCancel} className={styles.RequesterBtn}>Cancel </button>
      
      <button onClick={handleUpdateMemo} className={styles.RequesterBtn}>Update </button>
      </div>
    </form>

  );
};

export default EditMemo