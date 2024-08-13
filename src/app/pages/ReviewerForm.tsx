import React, { ReactNode, useState } from 'react';
import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { Formik, FormikConfig, FormikHelpers, FormikValues,Form } from 'formik';
import { mixed, object } from 'yup';
import styles from '../../styles/memoform.module.css';
import FirstApproval from '../component/formComp/FirstApprovalDropdown';
import FinalApproval from '../component/formComp/FinalApprovalDropdown';
import Requester from '../component/formComp/Requester';
import { useNavigate } from 'react-router-dom';
import ReviewerFormPages from '../component/formComp/ReviewerFormPages';
import * as Yup from 'yup';
const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

// export default function Review() {
//   const navigate = useNavigate();
//   return (
//     <div className={styles.card}>
//       <div className={styles.cardContent}>
//         <FormikStepper
//           initialValues={{
//             subject: '',
//             recipient: '',
//             from: '',
//             date: '',
//             description: '',
//             documentName: '',
//             attachedDocument: '',
//             reviewerName: '',
//             isReviewed: false,
//             firstApproverName: '',
//             isFirstApproved: false,
//             finalApproverName: '',
//             isFinalApproved: false,
//             template: ''
//           }}
//           onSubmit={async (values) => {
//             await sleep(3000); // Simulating a network request
//             console.log('Submitted values:', values);
//             // Navigate to reviewer page
//             navigate('/reviewer');
//           }}
//           steps={[
//             {
//               label: 'Requester',
//               component: <ReviewerFormPages />,
//               validationSchema: object({
//                 subject: mixed().required('Subject is required'),
//                 recipient: mixed().required('Recipient is required'),
//                 // Add other required fields as needed
//               })
//             },
//             {
//               label: 'Reviewer',
//               component: <ReviewerFormPages />,
//               validationSchema: object({
//                 reviewerName: mixed().required('Reviewer name is required'),
//                 isReviewed: mixed().oneOf([true], 'You must mark the memo as reviewed')
//               })
//             },
            
//             {
//               label: '1st Approval',
//               component: <FirstApproval />,
//               validationSchema: object({
//                 isFirstApproved: mixed().oneOf([true], 'Must be first approved')
//               })
//             },
//             {
//               label: 'Final Approval',
//               component: <FinalApproval />,
//               validationSchema: object({
//                 isFinalApproved: mixed().oneOf([true], 'Must be final approved')
//               })
//             }
//           ]}
//         />
//       </div>
//     </div>
//   );
// }
interface FormValues {
  subject: string;
  recipient: string;
  from: '',
  date: '',
  description: '',
  documentName: '',
  attachedDocument: "",
  reviewerName: string;
  isReviewed: boolean;
  firstApproverName: string;
  isFirstApproved: boolean;
  finalApproverName: string;
  isFinalApproved: boolean;
  template: string;
}
const validationSchemas = [
  Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    recipient: Yup.string().required('Recipient is required'),
  }),
];



const ReviewerForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const steps = ['Requester', 'Reviewer', '1st Approval', 'Final Approval'];

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const isLastStep = () => step === steps.length - 1;

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    if (isLastStep()) {
      await sleep(3000);
      console.log('Submitted values:', values);
      setCompleted(true);
    } else {
      handleNext();
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {completed ? (
        <div>Form Submitted Successfully!</div>
      ) : (
        <Formik<FormValues>
          initialValues={{
            subject: '',
            recipient: '',
            from: '',
            date: '',
            description: '',
            documentName: '',
            attachedDocument: '',
            reviewerName: '',
            isReviewed: false,
            firstApproverName: '',
            isFirstApproved: false,
            finalApproverName: '',
            isFinalApproved: false,
            template: ''
          }}
          validationSchema={validationSchemas[step]}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {step === 0 && <Requester />}
              {step === 1 && <ReviewerFormPages />}
              {step === 2 && <FirstApproval />}
              {step === 3 && <FinalApproval />}
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <Button disabled={step === 0} onClick={handleBack}>
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {isSubmitting ? 'Submitting' : isLastStep() ? 'Finish' : 'Next'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
export default ReviewerForm;
