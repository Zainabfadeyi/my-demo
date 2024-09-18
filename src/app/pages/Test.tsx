// import React, { useState } from 'react';
// import { Button, Stepper, Step, StepLabel, Grid, CircularProgress } from '@mui/material';
// import { Formik, Form, FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import ReviewerFormPages from '../component/formComp/ReviewerFormPages';
// import Requester from '../component/formComp/Requester';
// import FirstApproval from '../component/formComp/FirstApproval';
// import FinalApproval from '../component/formComp/FinalApproval';
// import styles from '../../styles/memoform.module.css';

// // Function to simulate a network request delay
// const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

// const validationSchemas = [
//   Yup.object().shape({
//     subject: Yup.string().notRequired(),
//     recipient: Yup.string().notRequired(),
//   }),
//   Yup.object().shape({
//     reviewerName: Yup.string().notRequired(),
//     isReviewed: Yup.bool().oneOf([true], 'You must mark the memo as reviewed'),
//   }),
//   Yup.object().shape({
//     isFirstApproved: Yup.bool().oneOf([true], 'Must be first approved'),
//   }),
//   Yup.object().shape({
//     isFinalApproved: Yup.bool().oneOf([true], 'Must be final approved'),
//   }),
// ];

// interface FormValues {
//   subject: string;
//   recipient: string;
//   reviewerName: string;
//   isReviewed: boolean;
//   firstApproverName: string;
//   isFirstApproved: boolean;
//   finalApproverName: string;
//   isFinalApproved: boolean;
// }

// const StepperForm: React.FC = () => {
//   const [step, setStep] = useState(0);
//   const [completed, setCompleted] = useState(false);

//   const steps = ['Requester', 'Reviewer', '1st Approval', 'Final Approval'];

//   const handleNext = () => setStep((prevStep) => prevStep + 1);
//   const handleBack = () => setStep((prevStep) => prevStep - 1);

//   const isLastStep = () => step === steps.length - 1;

//   const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
//     if (isLastStep()) {
//       await sleep(3000);
//       console.log('Submitted values:', values);
//       setCompleted(true);
//     } else {
//       handleNext();
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={{width:"100%"}}>
//       <div className={styles.stepper}>
//                  <div style={{ padding: "12px", margin: "-20px", marginBottom: "25px", fontWeight: "900", backgroundColor: "#F9FBFC" }}>
//                  Status
//                </div>
//       <Stepper activeStep={step} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       </div>
//       {completed ? (
//         <div>Form Submitted Successfully!</div>
//       ) : (
//         <Formik<FormValues>
//           initialValues={{
//             subject: '',
//             recipient: '',
//             reviewerName: '',
//             isReviewed: false,
//             firstApproverName: '',
//             isFirstApproved: false,
//             finalApproverName: '',
//             isFinalApproved: false,
//           }}
//           validationSchema={validationSchemas[step]}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               {step === 0 && <Requester />}
//               {step === 1 && <ReviewerFormPages/>}
//               {step === 2 && <FirstApproval />}
//               {step === 3 && <FinalApproval />}
//               <Grid container spacing={2} justifyContent="flex-end">
//                 <Grid item>
//                   <Button disabled={step === 0} onClick={handleBack}>
//                     Back
//                   </Button>
//                 </Grid>
//                 <Grid item>
//                   <Button
//                     startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
//                     disabled={isSubmitting}
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                   >
//                     {isSubmitting ? 'Submitting' : isLastStep() ? 'Finish' : 'Next'}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Form>
//           )}
//         </Formik>
//       )}
//     </div>
//   );
// };

// export default StepperForm;


import React from 'react'

const Test = () => {
  return (
    <div>Test</div>
  )
}

export default Test