import React, { useState, useEffect } from 'react';
import styles from '../../../styles/memoform.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../api/store';
import axios from '../../../api/axios';
import LoadingSpinner from '../chart/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { AiOutlineForm } from 'react-icons/ai';



const PreviewMemo: React.FC = () => {
  const [categories, setCategories] = useState<{ id: string; categoryName: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { memoId } = useParams<{ memoId: string }>();
  const [users, setUsers] = useState<string[]>([]); 
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isReviewerOpen, setIsReviewerOpen] = useState(false);
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
    documentNo:''
  });

  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    
  };
  const toggleDepartDropdown = () => {
    setIsDepartmentOpen(!isDepartmentOpen)
    
  };
  const toggleReviewDropdown = () => {
    setIsReviewerOpen(!isReviewerOpen)
    
  };

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
    const fetchMemoData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/v1/memo/${memoId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
  
        // Destructure the necessary fields from the response and set in formData
        const {
          subject,
          recipient,
          category,
          sender,
          date,
          description,
          department,
          landmark,
          reviewerName,
          documentNo
        } = response.data.memo;
  
        setFormData({
          subject,
          recipient,
          category,
          sender,
          date,
          description,
          department,
          landmark,
          reviewerName,
          documentNo
        });
      } catch (error) {
        console.error('Error fetching memo data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (memoId) {
      fetchMemoData();
    }
  }, [memoId, accessToken]);

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
    return <LoadingSpinner size={50} message="Loading memo..." />;
  }

  return (
    <form className={styles.formGroup}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ color: "#1976D2", width: "15%" , fontSize:"20px", columnGap:"10px", alignItems:"center", display:"flex"}}>
            <div style={{fontWeight:"900", fontSize:"23px"}}>
            <AiOutlineForm />
            </div>
            <div>
          {formData.documentNo}
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
              readOnly
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
                readOnly
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="category" className={styles.label}>Category Type</label>
              <select
              
                name="category"
                className={styles.formInput}
                value={formData.category}
             
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
                readOnly
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
                readOnly
            
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
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownLabel} onClick={toggleDropdown}>
          Location <span className={styles.dropdownIcon}>{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownField}>
          <input
        
                name="landmark"
                type="text"
                className={styles.formInput}
                value={formData.landmark}
                readOnly
            
              />
            
          </div>
        </div>
      )}
    </div>

      
      <div style={{ width: "100%" }}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownLabel} onClick={toggleDepartDropdown}>
          Department <span className={styles.dropdownIcon}>{isDepartmentOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      {isDepartmentOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownField}>
            
          <input
        
                name="department"
                type="text"
                className={styles.formInput}
                value={formData.department}
                readOnly
            
              />
          </div>
        </div>
      )}
    </div>
    <div style={{ width: "100%" }}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownLabel} onClick={toggleReviewDropdown}>
          Reviewer<span className={styles.dropdownIcon}>{isReviewerOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      {isReviewerOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownField}>
            
          <input
        
                name="reviewerName"
                type="text"
                className={styles.formInput}
                value={formData.reviewerName}
                readOnly
            
              />
          </div>
        </div>
      )}
    </div>

     
    </form>
  );
};

export default PreviewMemo;