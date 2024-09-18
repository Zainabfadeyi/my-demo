
// import React from 'react';
// import { Modal } from 'react-bootstrap';
// import { Document, Page } from 'react-pdf';

// interface FilePreviewModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   fileType: string;
//   fileContent: Uint8Array | string | null;
//   numPages: number;
//   onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
//   documentFile: { data: Uint8Array };
// }

// const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
//   isOpen,
//   onClose,
//   fileType,
//   fileContent,
//   numPages,
//   onDocumentLoadSuccess,
//   documentFile
// }) => {
//   return (
//     <Modal show={isOpen} onHide={onClose} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>File Preview</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {fileType === 'application/pdf' && fileContent ? (
//           <Document
//             file={documentFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//           >
//             {Array.from(new Array(numPages), (el, index) => (
//               <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//             ))}
//           </Document>
//         ) : fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && fileContent ? (
//           <div dangerouslySetInnerHTML={{ __html: fileContent as string }} />
//         ) : (
//           <p>File preview not available.</p>
//         )}
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default FilePreviewModal;
import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileType: string;
  content: Uint8Array | string | null;
  numPages: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  documentFile: { data: Uint8Array };
  children?: ReactNode;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  fileType,
  content,
  numPages,
  onDocumentLoadSuccess,
  documentFile,
}) => {
  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>File Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {fileType === 'pdf' && content ? (
          <Document
            file={documentFile}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        ) : fileType === 'docx' && content ? (
          <div dangerouslySetInnerHTML={{ __html: content as string }} />
        ) : (
          <p>File preview not available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FilePreviewModal;
