import React from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import styles from '../../styles/modal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app element to avoid accessibility issues

interface FilePreviewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  fileType: string|undefined;
  fileContent: Uint8Array | string;
  numPages: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onRequestClose,
  fileType,
  fileContent,
  numPages,
  onDocumentLoadSuccess,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="File Preview"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeButton} onClick={onRequestClose}>
        &times;
      </button>
      <h3>Document Preview:</h3>
      <div className={styles.modalContent}>
        {fileType === 'application/pdf' && fileContent instanceof Uint8Array ? (
          <Document file={{ data: fileContent }} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        ) : (
          <div className={styles.pageContainer}>
            <div dangerouslySetInnerHTML={{ __html: fileContent as string }} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FilePreviewModal;

