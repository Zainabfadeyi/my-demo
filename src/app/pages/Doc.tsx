// import React, { useState, useRef, useMemo } from 'react';
// import axios from '../../api/axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
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

//   const quillRef = useRef<ReactQuill>(null);

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

//         const {memo} =response.data
//         console.log(response);

//         setUploadStatus(`File uploaded successfully: ${response.data.message}`);
//         setUploadSize(memo.fileSize)
//         console.log("this is the upload file",uploadSize)
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
//     setNumPages(numPages)
//     console.log('Document loaded successfully:', numPages);
//   };
//   const documentFile = useMemo(() => ({ data: memoizedFileContent as Uint8Array }), [memoizedFileContent]);
  
// //"",
//   return (
//     <div style={{width:'100%', height:'100vh', display:'flex'}}>
//     <div className={styles.doc}>
//       {/* <div style={{display:'block'}}>
//       <ReactQuill theme="snow" value={value} onChange={setValue} ref={quillRef} />
//       </div> */}
//       {/* <input
//         type="text"
//         name="subject"
//         value={formInputs.get('subject') || ''}
//         onChange={handleInputChange}
//         placeholder="Subject"
//         required
//       />
//       <input
//         type="text"
//         name="recipient"
//         value={formInputs.get('recipient') || ''}
//         onChange={handleInputChange}
//         placeholder="Recipient"
//         required
//       /> */}
//       <div className={styles.upload}>
//       <UploadFiles
//         onChange={handleFileUpload}
//         uploadProgress={uploadProgress}
//         uploadedFileName={uploadedFileName}
//         uploadSize={uploadSize}
//         uploadStatus={uploadStatus}
//         onSubmit={handleUploadSubmit}
//         onFileNameClick={() => setIsModalOpen(true)}
//       />
//       </div>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {/* { {fileContent && (
//         <div className={styles.documentPreview}>
//           <h3>Document Preview:</h3>
//           {fileType === 'application/pdf' && fileContent instanceof Uint8Array ? (
//             <Document file={documentFile} onLoadSuccess={onDocumentLoadSuccess}>
//               {Array.from(new Array(numPages), (el, index) => (
//                 <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//               ))}
//             </Document>
//           ) : (
//             <div className={styles.pageContainer}>
//               <div dangerouslySetInnerHTML={{ __html: fileContent as string }} />
//             </div>
//           )}
//         </div>
//       )}}  */}

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
      
//     </div>
//     </div>
//   );
// };

// export default Doc;


import React, { useState, useRef, useMemo } from 'react';
import axios from '../../api/axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import mammoth from 'mammoth';
import styles from '../../styles/doc.module.css';
import UploadFiles from '../component/UploadFiles'; // Adjust the path according to your project structure
import FilePreviewModal from '../component/FilePreviewModal';


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

  // const quillRef = useRef<ReactQuill>(null);
  

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

  const handleUploadSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('subject', formInputs.get('subject') || '');
      formData.append('recipient', formInputs.get('recipient') || '');

      try {
        const response = await axios.post('http://localhost:8080/api/v1/memo/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: any) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        });

        const { memo } = response.data;
        console.log(response);

        setUploadStatus(`File uploaded successfully: ${response.data.message}`);
        setUploadSize(memo.fileSize);
        console.log("this is the upload file", uploadSize);
        setUploadedFileName(selectedFile.name);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Upload failed.');
      }
    } else {
      setError('No file selected.');
    }
  };

  const memoizedFileContent = useMemo(() => fileContent, [fileContent]);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    console.log('Document loaded successfully:', numPages);
  };
  const documentFile = useMemo(() => ({ data: memoizedFileContent as Uint8Array }), [memoizedFileContent]);

  return (
    <>
    <div style={{display: 'flex' }}>
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
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {fileContent && (
          <FilePreviewModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            fileType={fileType}
            fileContent={memoizedFileContent as Uint8Array}
            numPages={numPages}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default Doc;
