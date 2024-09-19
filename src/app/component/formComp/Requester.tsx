// import React, { useEffect, useState } from 'react';
// import { Field } from 'formik';
// import styles from '../../../styles/memoform.module.css';
// import ReviewerDropdown from './ReviewerDropdown';
// import { MemoApi } from '../../../api/memo/MemoApi'; // Import your MemoApi service

// import { useSelector } from 'react-redux';
// import { RootState } from '../../../api/store';
// import axios from '../../../api/axios';
// import Location from './Location';
// import LoadingSpinner from '../chart/LoadingSpinner';

// interface RequesterProps {
//   handleNext: () => void;
//   setSubmitting: (isSubmitting: boolean) => void;
//   memoId:string|undefined
// }
// interface Memo {
//   subject: string;
//   recipient: string;
//   category: string;
//   sender: string;
//   date: string;
//   description: string;
//   department: string;
//   landmark: string;
//   reviewerName: string;
// }

// const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

// const Requester: React.FC<RequesterProps> = ({ handleNext, setSubmitting, memoId }) => {
//   const [categories, setCategories] = useState<{ id: string; categoryName: string }[]>([]); 
//   const [selectedReviewer, setSelectedReviewer] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [memoData, setMemoData] = useState<Memo | null>(null);
//   const [temporaryMemoId, setTemporaryMemoId] = useState<string|undefined >(memoId);

//   const [formData, setFormData] = useState({
//     subject: '',
//     recipient: '',
//     category: '',
//     sender: '',
//     date: '',
//     description: '',
//     department:'',
//     landmark:'',
//     reviewerName:'',

//   });
//   const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
//   const userId = useSelector((state: RootState) => state.auth.user?.id);
//   const { createMemo } = MemoApi(); // Destructure the API function
  

//   const handleReviewerSelect = (user: string) => {
//     setSelectedReviewer(user);
//     setFormData((prevData) => ({
//       ...prevData,
//       reviewerName: user // Update formData with selected reviewer
//     }));
//   };
 
//   const handleDepartmentSelect = (department:string) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       // location: {
//       //   ...prevData.location,
//       //   department,
//       // },
//       department,
//     }));
//   };
//   // Handle input change for form fields
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;

//     // If the input type is 'checkbox', handle 'checked' instead of 'value'
//     if (type === 'checkbox') {
//       const target = e.target as HTMLInputElement;
//       setFormData({
//         ...formData,
//         [name]: target.checked,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('/api/v1/categories',
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}` // Pass access token in headers
//             }
//       }); 
//       setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, [])
//   useEffect(() => {
    

//     const fetchMemoData = async () => {
//       try {
//         const response = await axios.get(`/api/v1/memo/1`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         const data = response.data;
//         setMemoData(data);
//         setFormData((prevData) => ({
//           ...prevData,
//           ...data,
//           reviewerName: data.reviewerName || '',
//         }));
//       } catch (error) {
//         console.error('Error fetching memo data:', error);
//       }
//     };

//     fetchMemoData();
//   }, [temporaryMemoId, accessToken]);
  

//   const handleFormSubmit = async () => {
//     setSubmitting(true);
//     setIsLoading(true)
//     try {
      
//       // const response = await createMemo(formData); // Call API with formData

//       const memoData = {
//         ...formData,
//         reviewerName: selectedReviewer, // Use selected reviewer from state
//       };
//       console.log('formdata', memoData)
//       const response = await createMemo(memoData);
//       console.log('Memo created successfully:', response);
//       handleNext(); // Proceed to the next step if successful
//       window.location.reload();
//     } catch (error) {
//       console.error('Error creating memo:', error);
//     } finally {
//       setSubmitting(false);
//       setIsLoading(false);
//     }
//   };


 


  
  
//   return (
//     <div className={styles.formGroup}>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <div style={{ color: '#1976D2', width: '15%' }}>Memo Document</div>
//         <div className={styles.hr}></div>
//       </div>

//       <div className={styles.fieldCover}>
//         <div style={{ padding: '12px', margin: '-20px', fontWeight: '900', backgroundColor: '#F9FBFC' }}>
//           Memo Details
//         </div>

//         <div className={styles.fieldContent}>
//           <div className={styles.formField}>
//             <label htmlFor="subject" className={styles.label}>Subject</label>
//             <input
//               id="subject"
//               name="subject"
//               type="text"
//               className={styles.formInput}
//               value={formData.subject ||""}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className={styles.field}>
//             <div className={styles.formField}>
//               <label htmlFor="recipient" className={styles.label}>Recipient</label>
//               <input
//                 id="recipient"
//                 name="recipient"
//                 type="text"
//                 className={styles.formInput}
//                 value={formData.recipient }
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className={styles.formField}>
//               <label htmlFor="category" className={styles.label}>Category Type</label>
//               <Field
//                 as="select"
//                 id="category"
//                 name="category"
//                 className={styles.formInput}
//                 value={formData.category}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="" label="Select category" />
//                 {categories.map((category) => (
//                   <option key={category.categoryName} value={category.categoryName}>
//                     {category.categoryName}
//                   </option>
//                 ))}
//               </Field>
//             </div>
//           </div>

//           <div className={styles.field}>
//             <div className={styles.formField}>
//               <label htmlFor="from" className={styles.label}>From</label>
//               <input
//                 id="sender"
//                 name="sender"
//                 type="text"
//                 className={styles.formInput}
//                 value={formData.sender}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className={styles.formField}>
//               <label htmlFor="date" className={styles.label}>Date</label>
//               <input
//                 id="date"
//                 name="date"
//                 type="date"
//                 className={styles.formInput}
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className={styles.formField}>
//             <label htmlFor="description" className={styles.label}>Description</label>
//             <textarea
//               id="description"
//               name="description"
//               rows={4}
//               className={styles.input}
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//             ></textarea>
//           </div>

//         </div>
//       </div>

      

    
//       <div>
//         <Location onSelect={handleDepartmentSelect}/>
//         <ReviewerDropdown  onUserSelect={handleReviewerSelect}/>
//       </div>
//       {isLoading && (
//         <div style={{ marginTop: '10px', textAlign: 'center' }}>
//           <LoadingSpinner size={30} message="Processing..." />
//         </div>
//       )}

      
//       <div style={{ textAlign: 'right', marginTop: '20px' }}>
//         <button
//           onClick={handleFormSubmit}
//           className={styles.RequesterBtn}
//           disabled={isLoading} // Disable button while loading
//         >
//           Dispatch
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Requester;


import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import styles from '../../../styles/memoform.module.css';
import ReviewerDropdown from './ReviewerDropdown';
import { MemoApi } from '../../../api/memo/MemoApi'; // Import your MemoApi service
import { useSelector } from 'react-redux';
import { RootState } from '../../../api/store';
import axios from '../../../api/axios';
import Location from './Location';
import LoadingSpinner from '../chart/LoadingSpinner';

interface RequesterProps {
  handleFormSubmit: (formData: any) => Promise<void>;
  setSubmitting: (isSubmitting: boolean) => void;
  memoId: string | undefined;
}

const Requester: React.FC<RequesterProps> = ({ handleFormSubmit, setSubmitting, memoId }) => {
  const [categories, setCategories] = useState<{ id: string; categoryName: string }[]>([]);
  const [selectedReviewer, setSelectedReviewer] = useState<string>('');
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

  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmitClick = async () => {
    setSubmitting(true);
    
    try {
      await handleFormSubmit(formData);  // Submit form data
      setIsLoading(true);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };
  //   const handleFormSubmit = async () => {
//     setSubmitting(true);
//     setIsLoading(true)
//     try {
      
//       // const response = await createMemo(formData); // Call API with formData

//       const memoData = {
//         ...formData,
//         reviewerName: selectedReviewer, // Use selected reviewer from state
//       };
//       console.log('formdata', memoData)
//       const response = await createMemo(memoData);
//       console.log('Memo created successfully:', response);
//       handleNext(); // Proceed to the next step if successful
//       window.location.reload();
//     } catch (error) {
//       console.error('Error creating memo:', error);
//     } finally {
//       setSubmitting(false);
//       setIsLoading(false);
//     }
//   };

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

      {isLoading && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <LoadingSpinner size={30} message="Processing..." />
        </div>
      )}

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button
        type='submit'
          onClick={handleFormSubmitClick}
          className={styles.RequesterBtn}
          disabled={isLoading}
        >
          Dispatch
        </button>
      </div>
    </form>
  );
};

export default Requester;
