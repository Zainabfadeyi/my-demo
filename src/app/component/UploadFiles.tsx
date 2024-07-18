
import React, { useRef, useState } from 'react';
import styles from '../../styles/upload.module.css';
import { FaRegFileAlt, FaCheck, FaTimes, FaFilePdf } from "react-icons/fa";

interface UploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadProgress: number;
  uploadedFileName: string;
  uploadSize: string;
  uploadStatus:string;
  onSubmit: () => void;
  onFileNameClick: () => void;
}

const UploadFiles: React.FC<UploadProps> = ({
  onChange,
  uploadProgress,
  uploadedFileName,
  uploadSize,
  uploadStatus,
  onSubmit,
  onFileNameClick,
}) => {

  const [isFileSelected, setIsFileSelected] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsFileSelected(true);
    }
    onChange(event);
  };
  return (
    <>
      <div className={styles.overall}>
        
        <div className={styles.text}> 
          <div></div>
            <p style={{ alignItems: 'left', marginRight: "100px" , color:"#48B999", fontWeight:"500", fontSize:"20px"}}>Upload Files</p>
            <p style={{ alignItems: 'left', marginRight: "100px" }}>Upload document you want to share with your team</p>
            </div>
            
        <div className={styles.totalContainer}>
          <div className={styles.miniContainer}>
           
            <form className={styles.uploadBox}>
              <input type="file" name='file' className={styles.fileInput} hidden onChange={handleFileChange} ref={fileInputRef}/>
              <div className={styles.icon} onClick={handleFileInputClick}>
                <img src="./cloud.png" className={styles.cloud} />
                <p style={{ width: "100%" , color:"#4DBC9C"}}> Click to upload files </p>
              </div>
              {isFileSelected && (
                <button type="button" className={styles.button} onClick={onSubmit}>Upload</button>
              )}
              
            </form>
          </div>

          <div className={styles.section}>
            <section className={styles.loadingArea}>
              
              {uploadProgress > 0 &&(
                
                <li className={styles.row}>
                <div className={styles.content}>
                  <FaRegFileAlt className={styles.fa} />
                  <div className={styles.details}>
                    <span className={styles.name}>{uploadedFileName}</span>
                    <span className={styles.percent}>{uploadProgress}%</span>
                    <div className={styles.loadingBar}>
                      <div className={styles.loading} style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                </div>
              </li>
              
              )}
              
              
            </section>
            {uploadStatus && (
              <section className={styles.uploadedArea}>
                <li className={styles.row}>
                  <div className={styles.content}>
                    <FaRegFileAlt className={styles.fa} />
                    <div className={styles.details}>
                      <span className={styles.nameFile} 
                      onClick={onFileNameClick}
                      style={{ color: uploadStatus.includes('too large') ? 'red' : 'inherit' }}>
                        {uploadStatus.includes('too large') ? 'File is too large' : uploadedFileName}</span>
                      <span className={styles.nameFile}>
                        {uploadStatus.includes('too large') ? 'Failed' : uploadSize}
                      </span>
                    </div>
                  </div>
                  {uploadStatus.includes('success') ? (
                    <FaCheck className={styles.fa}  />
                  ) : (
                    <FaTimes className={styles.fa} style={{ color: 'red' }} />
                  )}
                </li>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFiles;

