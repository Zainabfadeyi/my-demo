import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import styles from '../../../styles/memoform.module.css';
import ReviewerDropdown from './ReviewerDropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../../api/store';
import axios from '../../../api/axios';
import Location from './Location';
import LoadingSpinner from '../chart/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

interface RequesterProps {
  handleFormSubmit: (formData: FormValues) => Promise<{ memoId: string }|undefined >;
  setSubmitting: (isSubmitting: boolean) => void;
  memoId?: string;
}
interface FormValues {
  subject: string;
  recipient: string;
  category: string;
  sender: string;
  date: string;
  description: string;
  department: string;
  landmark: string;
  reviewerName: string;
  from:string;
}



const Requester: React.FC<RequesterProps> = ({ handleFormSubmit, setSubmitting, memoId }) => {
  const [categories, setCategories] = useState<{ id: string; categoryName: string }[]>([]);
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
    from:''
  });
  const navigate =useNavigate()

  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // const isFormValid = () => {
  //   const { subject, recipient, category, sender, date, description} = formData;
  //   return (
  //     subject.trim() !== '' &&
  //     recipient.trim() !== '' &&
  //     category.trim() !== '' &&
  //     sender.trim() !== '' &&
  //     date.trim() !== '' &&
  //     description.trim() !== ''
  //   );
  // };
  const handleFormSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!isFormValid()) {
    //   console.error('Form is not valid');
    //   return; // Return early if form is invalid
    // }
    setSubmitting(true);
    setIsLoading(true);
  
    try {
      const response = await handleFormSubmit(formData);
      console.log(response);
  
      // Check if the response is defined and contains memoId
      if (response && response.memoId) {
        navigate(`/previewMemo/${response.memoId}`);
      } else {
        console.error('Memo ID not found');
      }
    } catch (error) {
      console.error('Error submitting the form', error);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
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
  if (isLoading) {
    return <LoadingSpinner size={50} message="Submitting your memo..." />;
  }

  

  return (
    <form className={styles.formGroup}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#1976D2', width: '15%' }}>Memo Document</div>
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
              <Field
                as="select"
                id="category"
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
              </Field>
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

      <Location onSelect={(department) => setFormData({ ...formData, department })} />
      <ReviewerDropdown onUserSelect={(user) => setFormData({ ...formData, reviewerName: user })} />

    

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button
        type='submit'
       
          onClick={handleFormSubmitClick}
          className={styles.RequesterBtn}
          
        
        >
          Dispatch
        </button>
      </div>
    </form>
  );
};

export default Requester;
