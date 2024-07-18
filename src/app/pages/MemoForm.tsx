// import React, { ReactElement, useState, ReactNode } from 'react';
// import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material';
// import { Field, Form, Formik, FormikConfig, FormikValues, FormikProps, useFormikContext } from 'formik';
// import { TextField, CheckboxWithLabel } from 'formik-material-ui';
// import { mixed, object } from 'yup';

// const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

// export default function MemoForm() {
//   return (
//     <Card>
//       <CardContent>
//         <FormikStepper
//           initialValues={{
//             subject: '',
//             recipient: '',
//             from: '',
//             date: '',
//             description: '',
//             documentName: '',
//             attachedDocument: '',
//             reviewer: '',
//             firstApprover: '',
//             finalApprover: '',
//             templates: ''
//           }}
//           onSubmit={async (values) => {
//             await sleep(3000);
//             console.log('values', values);
//           }}
//         >
//           <FormikStep label="Memo Details">
//             <MemoDetails />
//           </FormikStep>

//           <FormikStep label="Attachment">
//             <Attachment />
//           </FormikStep>

//           <FormikStep label="Reviewer" validationSchema={object({
//             isReviewed: mixed().oneOf([true], 'Must be reviewed')
//           })}>
//             <Reviewer />
//           </FormikStep>

//           <FormikStep label="1st Approval" validationSchema={object({
//             isFirstApproved: mixed().oneOf([true], 'Must be first approved')
//           })}>
//             <FirstApproval />
//           </FormikStep>

//           <FormikStep label="Final Approval" validationSchema={object({
//             isFinalApproved: mixed().oneOf([true], 'Must be final approved')
//           })}>
//             <FinalApproval />
//           </FormikStep>

//           <FormikStep label="Templates">
//             <Templates />
//           </FormikStep>
//         </FormikStepper>
//       </CardContent>
//     </Card>
//   );
// }

// function MemoDetails() {
//   return (
//     <>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="subject" component={TextField} label="Subject" />
//       </Box>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="recipient" component={TextField} label="Recipient" />
//       </Box>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="from" component={TextField} label="From" />
//       </Box>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="date" component={TextField} label="Date" type="date" InputLabelProps={{ shrink: true }} />
//       </Box>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="description" component={TextField} label="Description" multiline rows={4} />
//       </Box>
//     </>
//   );
// }

// function Attachment() {
//   return (
//     <>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="documentName" component={TextField} label="Document Name/Description" />
//       </Box>
//       <Box paddingBottom={2}>
//         <input id="attachedDocument" name="attachedDocument" type="file" />
//       </Box>
//     </>
//   );
// }

// function Reviewer() {
//   return (
//     <>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="reviewerName" component={TextField} label="Reviewer Name" />
//       </Box>
//       <Box paddingBottom={2}>
//         <Field
//           name="isReviewed"
//           type="checkbox"
//           component={CheckboxWithLabel}
//           Label={{ label: 'Reviewed' }}
//         />
//       </Box>
//     </>
//   );
// }

// function FirstApproval() {
//   return (
//     <>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="firstApproverName" component={TextField} label="1st Approver Name" />
//       </Box>
//       <Box paddingBottom={2}>
//         <Field
//           name="isFirstApproved"
//           type="checkbox"
//           component={CheckboxWithLabel}
//           Label={{ label: '1st Approved' }}
//         />
//       </Box>
//     </>
//   );
// }

// function FinalApproval() {
//   return (
//     <>
//       <Box paddingBottom={2}>
//         <Field fullWidth name="finalApproverName" component={TextField} label="Final Approver Name" />
//       </Box>
//       <Box paddingBottom={2}>
//         <Field
//           name="isFinalApproved"
//           type="checkbox"
//           component={CheckboxWithLabel}
//           Label={{ label: 'Final Approved' }}
//         />
//       </Box>
//     </>
//   );
// }

// function Templates() {
//   return (
//     <Box paddingBottom={2}>
//       <Field fullWidth name="template" component={TextField} label="Template" />
//     </Box>
//   );
// }

// export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
//   label: string;
//   children: ReactNode | ((props: FormikProps<FormikValues>) => ReactNode);
// }

// export function FormikStep({ children }: FormikStepProps) {
//   return <>{children}</>;
// }

// export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
//   const childrenArray = React.Children.toArray(children) as ReactElement<FormikStepProps>[];
//   const [step, setStep] = useState(0);
//   const currentChild = childrenArray[step];
//   const [completed, setCompleted] = useState(false);

//   function isLastStep() {
//     return step === childrenArray.length - 1;
//   }

//   return (
//     <Formik
//       {...props}
//       validationSchema={currentChild.props.validationSchema}
//       onSubmit={async (values, helpers) => {
//         if (isLastStep()) {
//           await props.onSubmit(values, helpers);
//           setCompleted(true);
//         } else {
//           setStep((s) => s + 1);
//           helpers.setTouched({});
//         }
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form autoComplete="off">
//           <Stepper alternativeLabel activeStep={step}>
//             {childrenArray.map((child, index) => (
//               <Step key={child.props.label} completed={step > index || completed}>
//                 <StepLabel>{child.props.label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>

//           {currentChild}

//           <Grid container spacing={2}>
//             {step > 0 && (
//               <Grid item>
//                 <Button
//                   disabled={isSubmitting}
//                   variant="contained"
//                   color="primary"
//                   onClick={() => setStep((s) => s - 1)}
//                 >
//                   Back
//                 </Button>
//               </Grid>
//             )}
//             <Grid item>
//               <Button
//                 startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
//                 disabled={isSubmitting}
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//               >
//                 {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
//               </Button>
//             </Grid>
//           </Grid>
//         </Form>
//       )}
//     </Formik>
//   );
// }

import React from 'react'

const MemoForm = () => {
  return (
    <div>MemoForm</div>
  )
}

export default MemoForm