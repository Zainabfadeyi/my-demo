// import React from 'react';
// import { Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import styles from '../../styles/modal.module.css';
// import Modal from 'react-modal';

// Modal.setAppElement('#root'); // Set the app element to avoid accessibility issues

// interface FilePreviewModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   fileType: string|undefined;
//   fileContent: Uint8Array | string;
//   numPages: number;
//   onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
// }

// const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
//   isOpen,
//   onRequestClose,
//   fileType,
//   fileContent,
//   numPages,
//   onDocumentLoadSuccess,
// }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="File Preview"
//       className={styles.modal}
//       overlayClassName={styles.overlay}
//     >
//       <button className={styles.closeButton} onClick={onRequestClose}>
//         &times;
//       </button>
//       <h3>Document Preview:</h3>
//       <div className={styles.modalContent}>
//         {fileType === 'application/pdf' && fileContent instanceof Uint8Array ? (
//           <Document file={{ data: fileContent }} onLoadSuccess={onDocumentLoadSuccess}>
//             {Array.from(new Array(numPages), (el, index) => (
//               <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//             ))}
//           </Document>
//         ) : (
//           <div className={styles.pageContainer}>
//             <div dangerouslySetInnerHTML={{ __html: fileContent as string }} />
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default FilePreviewModal;

import React from 'react';
import { Modal } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileType: string;
  fileContent: Uint8Array | string | null;
  numPages: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  documentFile: { data: Uint8Array };
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  fileType,
  fileContent,
  numPages,
  onDocumentLoadSuccess,
  documentFile
}) => {
  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>File Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {fileType === 'application/pdf' && fileContent ? (
          <Document
            file={documentFile}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        ) : fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && fileContent ? (
          <div dangerouslySetInnerHTML={{ __html: fileContent as string }} />
        ) : (
          <p>File preview not available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FilePreviewModal;
