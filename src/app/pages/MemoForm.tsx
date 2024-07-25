import React, { useState, ReactNode } from 'react';
import {  Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material';
import {  Formik, FormikConfig, FormikValues } from 'formik';
import { mixed, object } from 'yup';
import styles from '../../styles/memoform.module.css';
import Reviewer from '../component/formComp/ReviewerDropdown';
import FirstApproval from '../component/formComp/FirstApproval';
import FinalApproval from '../component/formComp/FinalApproval';
import Requester from '../component/formComp/Requester';

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));


export default function MemoForm() {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <FormikStepper
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
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log('values', values);
          }}
          steps={[
            {
              label: 'Requester',
              component: <Requester />
            },
            {
              label: 'Reviewer',
              component: <Reviewer />,
              validationSchema: object({
                isReviewed: mixed().oneOf([true], 'Must be reviewed')
              })
            },
            {
              label: '1st Approval',
              component: <FirstApproval />,
              validationSchema: object({
                isFirstApproved: mixed().oneOf([true], 'Must be first approved')
              })
            },
            {
              label: 'Final Approval',
              component: <FinalApproval />,
              validationSchema: object({
                isFinalApproved: mixed().oneOf([true], 'Must be final approved')
              })
            }
          ]}
        />
      </div>
    </div>
  );
}

interface FormikStepProps {
  label: string;
  component: ReactNode;
  validationSchema?: any;
}

interface FormikStepperProps extends FormikConfig<FormikValues> {
  steps: FormikStepProps[];
}

export function FormikStepper({ steps, ...props }: FormikStepperProps) {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === steps.length - 1;
  }

  return (
    <div style={{backgroundColor:"none", width:"100%"}}>
    <Formik
      {...props}
      validationSchema={currentStep.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
     
    >
      {({ isSubmitting }) => (
        <div style={{ width:"100%"}}>
          <div className={styles.stepper}>
          <div style={{ padding:"12px",margin:"-20px", marginBottom:"25px", fontWeight:"900", backgroundColor:"#F9FBFC"}}> 
          Status</div>
          <Stepper alternativeLabel activeStep={step}>
            {steps.map((step, index) => (
              <Step key={step.label} completed={completed}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          </div>
          {currentStep.component}

          <Grid container spacing={2}>
            {step > 0 && (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Formik>
    </div>
  );
}
