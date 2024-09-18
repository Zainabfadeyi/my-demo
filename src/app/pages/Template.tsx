import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styles from "../../styles/template.module.css";
import { FaFileAlt } from "react-icons/fa";



const Template: React.FC = () => {
  

  const signatureRef = useRef<SignatureCanvas | null>(null);
  
  
  const documentName = "Default Memo Template"; // Display name for the document
  const fileSize = "0.71 MB"; // File size
  const type = `Ms Word`;
  const documentUrl='/default-memo-template.docx'

  return (
    <div className={styles.Container}>
      <div>
        <div style={{ padding: "12px", fontWeight: "900", backgroundColor: "#F9FBFC" }}>
          Template
        </div>
        <div className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={documentName} // Set the value to the document name
              readOnly
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea
              id="description"
              name="description"
              rows={7}
              className={styles.input}
              value={`This is a template that has 3 signing sections: 
              - Reviewer 
              - First Approval 
              - Final Approval`} // Set the description text
              readOnly // Make it read-only
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="type" className={styles.label}>Type</label>
            <input
              id="type"
              name="type"
              type="text"
              readOnly
              value={type}
              className={styles.formInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.template}>
        <div className={styles.file}>
          <div style={{ fontSize: "35px" }}><FaFileAlt /></div>
          <div>
            <a
              href={documentUrl}
              download="default-memo-template.docx" // Set a default download file name with .docx extension
              style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer', fontSize: "20px" }}
            >
              {documentName}
            </a>
            <div style={{ fontSize: "13px" }}>{fileSize}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
