import React, { useEffect, useState } from 'react';
import { Button, Stepper, Step, StepLabel } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ThemeProvider } from '@mui/material/styles';
import ReviewerFormPages from '../component/formComp/ReviewerFormPages';
import Requester from '../component/formComp/Requester';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/memoform.module.css';
import theme from '../component/formComp/Theme';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../api/store';
import LoadingSpinner from '../component/chart/LoadingSpinner';
import { MemoApi } from '../../api/memo/MemoApi';
// const validationSchemas = [
//   Yup.object().shape({
//     subject: Yup.string().required('Subject is required'),
//     recipient: Yup.string().required('Recipient is required'),
//   }),
//   // Add validation schemas for other steps if needed
// ];

// interface FormValues {
//   subject: string;
//   recipient: string;
//   from: string;
//   date: string;
//   description: string;
//   reviewerName: string;
//   department:string;
//   landmark:string
// }

// const MemoForm: React.FC = () => {
//   const [step, setStep] = useState(0);
//   const [completed, setCompleted] = useState(false);
//   const [memoData, setMemoData] = useState<FormValues | null>(null);
//   const navigate = useNavigate();
//   const { memoId, documentNo } = useParams();
//   const steps = ['Sender', 'Received'];
//   const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
//   const userId = useSelector((state: RootState) => state.auth.user?.id);
  

//   useEffect(() => {
//     console.log("Current pathname:", window.location.pathname);
//     console.log("memoId:", memoId);
//     console.log("documentNo:", documentNo);

//     if (memoId) {
//       axios.get(`/api/v1/memo/${memoId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       })
//         .then(response => {
//           setMemoData(response.data);
         
//           const encodedMemoId = encodeURIComponent(memoId);
//           const encodedDocumentNo = encodeURIComponent(documentNo || '');
//           const reviewerPath = `/reviewer/api/v1/memorandums/approve/${encodedMemoId}/${encodedDocumentNo}`;

//           if (window.location.pathname === reviewerPath) {
//             setStep(1); // Set step to Reviewer
//           } else {
//             setStep(0); // Default to Requester
//           }
//         })
//         .catch(error => console.error("Error fetching memo data:", error));
//     }
//   }, [memoId, documentNo, accessToken]);



//   const handleNext = () => setStep((prevStep) => prevStep + 1);
//   const handleBack = () => setStep((prevStep) => prevStep - 1);

//   const isLastStep = () => step === steps.length - 1;

//   const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
//     if (isLastStep()) {
//       console.log('Submitting final step:', values);
//       setCompleted(true);
//     } else {
//       handleNext();
//       setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (completed) {
//       navigate('/inbox');
//     }
//   }, [completed, navigate]);

//   return (
//     <ThemeProvider theme={theme}>
//       <div style={{ width: '100%' }}>
//         <div className={styles.stepper}>
//           <div style={{ padding: '12px', margin: '-20px', marginBottom: '25px', fontWeight: '900', backgroundColor: '#F9FBFC' }}>
//             Status
//           </div>
//           <Stepper activeStep={step} alternativeLabel>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </div>

//         {completed ? (
//           <div>Memo Approved</div>
//         ) : (
//           <Formik<FormValues>
//             initialValues={memoData || {
//               subject: '',
//               recipient: '',
//               from: '',
//               date: '',
//               description: '',
//               department:'',
//               landmark:'',
//               reviewerName: '',
            
//             }}
//             validationSchema={validationSchemas[step]}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {({  setSubmitting }) => (
//               <Form>
//                 {step === 0 && <Requester handleNext={handleNext} setSubmitting={setSubmitting} memoId={memoId} />}
//                 {step === 1 && <ReviewerFormPages memoId={memoId} documentNo={documentNo} />}
               
        
//               </Form>
//             )}
//           </Formik>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default MemoForm;



const validationSchemas = [
  Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    recipient: Yup.string().required('Recipient is required'),
  }),
  // Add validation schemas for other steps if needed
];

interface FormValues {
  subject: string;
  recipient: string;
  from: string;
  date: string;
  description: string;
  reviewerName: string;
  department: string;
  landmark: string;
}

const MemoForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [memoData, setMemoData] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);  // Loading state
  const navigate = useNavigate();
  const { memoId, documentNo } = useParams();
  const steps = ['Sender', 'Received'];
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { createMemo } = MemoApi();

  useEffect(() => {
    if (memoId) {
      fetchMemoData();  // Fetch memo data on page load
    }
  }, [memoId, documentNo, accessToken]);

  const fetchMemoData = async () => {
    try {
      setIsLoading(true);
      const encodedMemoId = encodeURIComponent(memoId || '');  // Make sure it's declared before use
      const encodedDocumentNo = encodeURIComponent(documentNo || '');

      const response = await axios.get(`/api/v1/memo/19`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMemoData(response.data);
               
      const reviewerPath = `/reviewer/api/v1/memorandums/approve/${encodedMemoId}/${encodedDocumentNo}`;
      if (window.location.pathname === reviewerPath) {
        setStep(1);  // Set step to Reviewer
      } else {
        setStep(0);  // Default to Requester
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching memo data:", error);
      setIsLoading(false);
    }
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const isLastStep = () => step === steps.length - 1;

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setSubmitting(true);
    if (isLastStep()) {
      setCompleted(true);
    } else {
      handleNext();
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (completed) {
      navigate('/inbox');
    }
  }, [completed, navigate]);

  const handleFormSubmit = async (formData: FormValues) => {
    setIsLoading(true);
    try {
      // Use the createMemo function to submit the form data
      await createMemo(formData);
      // After successful creation, refetch the memo data and reload the form
      await fetchMemoData();
    } catch (error) {
      console.error('Error creating memo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100%' }}>
        <div className={styles.stepper}>
          <div style={{ padding: '12px', margin: '-20px', marginBottom: '25px', fontWeight: '900', backgroundColor: '#F9FBFC' }}>
            Status
          </div>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        {completed ? (
          <div>Memo Approved</div>
        ) : (
          <Formik<FormValues>
            initialValues={memoData || {
              subject: '',
              recipient: '',
              from: '',
              date: '',
              description: '',
              department: '',
              landmark: '',
              reviewerName: '',
            }}
            validationSchema={validationSchemas[step]}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ setSubmitting }) => (
              <Form>
                {step === 0 && <Requester handleFormSubmit={handleFormSubmit} setSubmitting={setSubmitting} memoId={memoId} />}
                {step === 1 && <ReviewerFormPages memoId={memoId} documentNo={documentNo} />}
              </Form>
            )}
          </Formik>
        )}

        {isLoading && <LoadingSpinner size={30} message="Processing..." />}
      </div>
    </ThemeProvider>
  );
};

export default MemoForm;
