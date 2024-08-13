import React, { useEffect, useState } from 'react';
import { Button, Stepper, Step, StepLabel, Grid, CircularProgress } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ThemeProvider } from '@mui/material/styles';
import ReviewerFormPages from '../component/formComp/ReviewerFormPages';
import Requester from '../component/formComp/Requester';
import FirstApproval from '../component/formComp/FirstApproval';
import FinalApproval from '../component/formComp/FinalApproval';
import styles from '../../styles/memoform.module.css';
import theme from '../component/formComp/Theme'; 
import { useNavigate } from 'react-router-dom';

// Function to simulate a network request delay
const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const validationSchemas = [
  Yup.object().shape({
    subject: Yup.string().notRequired(),
    recipient: Yup.string().notRequired(),
  }),
];

interface FormValues {
  subject: string;
  recipient: string;
  from: '';
  date: '';
  description: '';
  documentName: '';
  attachedDocument: "";
  reviewerName: string;
  firstApproverName: string;
  finalApproverName: string;
  template: string;
}

const MemoForm: React.FC = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    if (completed) {
      navigate('/inbox');
    }
  }, [completed, navigate]);

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
          <div>
            
          </div>
          
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
              firstApproverName: '',
              finalApproverName: '',
              template: '',
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
    </ThemeProvider>
  );
};

export default MemoForm;
