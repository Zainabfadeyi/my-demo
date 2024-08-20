import React from 'react';
import { Field } from 'formik';
import styles from '../../../styles/memoform.module.css';
import Doc from '../../pages/Doc';
import ReviewerDropdown from './ReviewerDropdown';
import FirstApprovalDropdown from './FirstApprovalDropdown';
import FinalApprovalDropdown from './FinalApprovalDropdown';
import Templates from './Templates';

const Requester: React.FC = () => (
  <div className={styles.formGroup}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ color: "#1976D2", width: "15%" }}>Memo Document</div>
      <div className={styles.hr}></div>
    </div>

    <div className={styles.fieldCover}>
      <div style={{ padding: "12px", margin: "-20px", fontWeight: "900", backgroundColor: "#F9FBFC" }}>
        Memo Details
      </div>

      <div className={styles.fieldContent}>
        <div className={styles.formField}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input id="subject" name="subject" type="text" className={styles.formInput} />
          </div>
        <div className={styles.field}>
        <div className={styles.formField}>
            <label htmlFor="recipient" className={styles.label}>Recipient</label>
            <input id="recipient" name="recipient" type="text" className={styles.formInput} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="category" className={styles.label}>Category Type</label>
            <Field as="select" id="category" name="category" className={styles.formInput}>
              <option value="" label="Select category" />
              <option value="employment agreement" label="Employment Agreement" />
              <option value="new employer document" label="New Employer Document" />
              <option value="departmental benefits" label="Departmental Benefits" />
              <option value="offer letter" label="Offer Letter" />
              <option value="faculty benefit" label="Faculty Benefit" />
              <option value="student benefit" label="Student Benefit" />
              <option value="staff benefits" label="Staff Benefits" />
            </Field>
          </div>
        </div>

        <div className={styles.field}>
          

          <div className={styles.formField}>
            <label htmlFor="from" className={styles.label}>From</label>
            <input id="from" name="from" type="text" className={styles.formInput} />
          </div>

          <div className={styles.formField}>
            <label htmlFor="date" className={styles.label}>Date</label>
            <input id="date" name="date" type="date" className={styles.formInput} />
          </div>
        </div>

        <div className={styles.formField}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea id="description" name="description" rows={4} className={styles.input}></textarea>
        </div>
      </div>
    </div>

    <div className={styles.docsCover}>
      <div style={{ padding: "12px", margin: "-20px", fontWeight: "900", backgroundColor: "#F9FBFC" }}>
        Attachment
      </div>
      <div className={styles.docsContent}>
        <div className={styles.formFieldAttachment}>
          <label htmlFor="documentName" className={styles.label}>Document Name/Description</label>
          <textarea id="documentName" name="documentName" rows={6} className={styles.input}></textarea>
        </div>
        <div style={{ width: "100%" }}>
          <Doc />
        </div>
      </div>
    </div>

    <div>
      <ReviewerDropdown />
      <FirstApprovalDropdown />
      <FinalApprovalDropdown />
      <Templates />
    </div>
  </div>
);

export default Requester;