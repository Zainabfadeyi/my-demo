


// import React, { useState, useRef, useMemo } from 'react';
// import axios from '../../api/axios';
// // import ReactQuill from 'react-quill';
// // import 'react-quill/dist/quill.snow.css';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import mammoth from 'mammoth';
// import styles from '../../styles/doc.module.css';
// import UploadFiles from '../component/UploadFiles'; // Adjust the path according to your project structure
// import FilePreviewModal from '../component/FilePreviewModal';


// pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

// const Doc: React.FC = () => {
//   const [formInputs, setFormInputs] = useState<Map<string, any>>(new Map());
//   const [fileType, setFileType] = useState<string>('');
//   const [fileContent, setFileContent] = useState<Uint8Array | string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>('');
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [uploadedFileName, setUploadedFileName] = useState<string>('');
//   const [uploadStatus, setUploadStatus] = useState<string>('');
//   const [uploadSize, setUploadSize] = useState<string>('');
//   const [numPages, setNumPages] = useState<number>(0);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   // const quillRef = useRef<ReactQuill>(null);
  

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormInputs(prevState => new Map(prevState).set(name, value));
//   };

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setFileType(file.type);
//       const reader = new FileReader();
//       reader.onload = async (e: any) => {
//         try {
//           const arrayBuffer = e.target.result as ArrayBuffer;
//           if (file.type === 'application/pdf') {
//             const uint8Array = new Uint8Array(arrayBuffer);
//             setFileContent(uint8Array);
//           } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//             const result = await mammoth.convertToHtml({ arrayBuffer });
//             setFileContent(result.value);
//           } else {
//             setError('Unsupported file type. Please upload a DOCX or PDF file.');
//           }
//           setError('');
//         } catch (err) {
//           setError('Failed to read the document. It may be corrupted.');
//           console.error('Error reading document:', err);
//         }
//       };
//       reader.onerror = () => {
//         setError('Error reading file.');
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const handleUploadSubmit = async () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('subject', formInputs.get('subject') || '');
//       formData.append('recipient', formInputs.get('recipient') || '');

//       try {
//         const response = await axios.post('http://localhost:8080/api/v1/memo/upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           onUploadProgress: (progressEvent: any) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           },
//         });

//         const { memo } = response.data;
//         console.log(response);

//         setUploadStatus(`File uploaded successfully: ${response.data.message}`);
//         setUploadSize(memo.fileSize);
//         console.log("this is the upload file", uploadSize);
//         setUploadedFileName(selectedFile.name);
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         setUploadStatus('Upload failed.');
//       }
//     } else {
//       setError('No file selected.');
//     }
//   };

//   const memoizedFileContent = useMemo(() => fileContent, [fileContent]);
//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//     console.log('Document loaded successfully:', numPages);
//   };
//   const documentFile = useMemo(() => ({ data: memoizedFileContent as Uint8Array }), [memoizedFileContent]);

//   return (
//     <>
//     <div style={{display: 'flex' }}>
//       <div className={styles.doc}>
//         <div className={styles.upload}>
//           <UploadFiles
//             onChange={handleFileUpload}
//             uploadProgress={uploadProgress}
//             uploadedFileName={uploadedFileName}
//             uploadSize={uploadSize}
//             uploadStatus={uploadStatus}
//             onSubmit={handleUploadSubmit}
//             onFileNameClick={() => setIsModalOpen(true)}
//           />
//         </div>
//         {error && <div style={{ color: 'red' }}>{error}</div>}
//         {fileContent && (
//           <FilePreviewModal
//             isOpen={isModalOpen}
//             onRequestClose={() => setIsModalOpen(false)}
//             fileType={fileType}
//             fileContent={memoizedFileContent as Uint8Array}
//             numPages={numPages}
//             onDocumentLoadSuccess={onDocumentLoadSuccess}
//           />
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Doc;

import React, { useState, useMemo } from 'react';
import axios from '../../api/axios';
import styles from '../../styles/doc.module.css';
import UploadFiles from '../component/UploadFiles';
import FilePreviewModal from '../component/FilePreviewModal';
import { Document, Page, pdfjs } from 'react-pdf';
import mammoth from 'mammoth';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

const Doc: React.FC = () => {
  const [formInputs, setFormInputs] = useState<Map<string, any>>(new Map());
  const [fileType, setFileType] = useState<string>('');
  const [fileContent, setFileContent] = useState<Uint8Array | string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadSize, setUploadSize] = useState<string>('');
  const [numPages, setNumPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs(prevState => new Map(prevState).set(name, value));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileType(file.type);
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        try {
          const arrayBuffer = e.target.result as ArrayBuffer;
          if (file.type === 'application/pdf') {
            const uint8Array = new Uint8Array(arrayBuffer);
            setFileContent(uint8Array);
          } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setFileContent(result.value);
          } else {
            setError('Unsupported file type. Please upload a DOCX or PDF file.');
          }
          setError('');
        } catch (err) {
          setError('Failed to read the document. It may be corrupted.');
          console.error('Error reading document:', err);
        }
      };
      reader.onerror = () => {
        setError('Error reading file.');
      };
      reader.readAsArrayBuffer(file);
    }
  };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//         setSelectedFile(file);
//         console.log("Selected file:", file);
//     }
// };

const handleUploadSubmit = async () => {
  if (selectedFile) {
      const formData = new FormData();

      // Append the file itself to the FormData
      formData.append('file', selectedFile);

      console.log("FormData before sending:", Array.from(formData.entries()));

      try {
          // Make the POST request to upload the file along with metadata
          const response = await axios.post('/api/v1/memo/upload', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: (progressEvent: any) => {
                  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setUploadProgress(percentCompleted);
              },
          });

          // Destructure the response data to get the uploaded file information
          const { id, fileName, fileSize, status } = response.data;

          // Update the UI with the response data
          setUploadStatus(`File uploaded successfully: ${status}`);
          setUploadSize(fileSize);
          setUploadedFileName(fileName);

          // Log the received data
          console.log("This is the file ID:", id);
          console.log("This is the file size:", fileSize);
          console.log("This is the file name:", fileName);

          // Reset progress bar after a short delay
          setTimeout(() => setUploadProgress(0), 2000);
      } catch (error) {
          console.error('Error uploading file:', error);
          setUploadStatus('Upload failed.');
      }
  } else {
      setError('No file selected.');
  }
}


  const memoizedFileContent = useMemo(() => fileContent, [fileContent]);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    console.log('Document loaded successfully:', numPages);
  };
  const documentFile = useMemo(() => ({ data: memoizedFileContent as Uint8Array }), [memoizedFileContent]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className={styles.doc}>
          <div className={styles.upload}>
            <UploadFiles
              onChange={handleFileUpload}
              uploadProgress={uploadProgress}
              uploadedFileName={uploadedFileName}
              uploadSize={uploadSize}
              uploadStatus={uploadStatus}
              onSubmit={handleUploadSubmit}
              onFileNameClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <FilePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fileType={fileType}
        fileContent={memoizedFileContent}
        numPages={numPages}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        documentFile={documentFile}
      />
    </>
  );
};

export default Doc;
