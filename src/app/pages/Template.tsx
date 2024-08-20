import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styles from "../../styles/template.module.css";
import { FaFileAlt } from "react-icons/fa";

const Template: React.FC = () => {
    const signatureRef = useRef<SignatureCanvas | null>(null);

    // Define the document URL and name
    const documentUrl = "/memo-template.docx"; // Path to your document
    const documentName = "Default Memo Template"; // Display name for the document
    const fileSize = "0.71 MB"; // File size

    // Description of the template
    const templateDescription = `This is a template that has 3 signing sections:
    - Reviewer
    - First Approval
    - Final Approval
    
    It includes the necessary document information required to sign a document.`;
    const type= `Ms Word`

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
                            value={templateDescription} // Set the description text
                            readOnly // Make it read-only if you don't want it to be editable
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
                    <div style={{fontSize:"35px"}}><FaFileAlt /></div>
                    
                    <div>
                        <a 
                            href={documentUrl} 
                            download 
                            style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer', fontSize:"20px" }}
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