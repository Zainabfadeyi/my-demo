// import React, { useState, useMemo } from 'react';
// import axios from '../../api/axios';
// import styles from '../../styles/doc.module.css';
// import UploadFiles from '../component/UploadFiles';
// import FilePreviewModal from '../component/FilePreviewModal';
// import { Document, Page, pdfjs } from 'react-pdf';
// import mammoth from 'mammoth';

// interface DocProps {
//   onFileUpload: (file: { fileName: string; fileContent: Uint8Array | string | null }) => void;
// }
// pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

// const Doc: React.FC <DocProps>= ({onFileUpload}) => {
//   const [formInputs, setFormInputs] = useState<Map<string, any>>(new Map());
//   const [fileType, setFileType] = useState<string>('');
//   const [fileContent, setFileContent] = useState<Uint8Array | string | null>(null);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [error, setError] = useState<string>('');
//   const [uploadProgress, setUploadProgress] = useState<number[]>([]);
//   const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);
//   const [uploadStatuses, setUploadStatuses] = useState<string[]>([]);
//   const [uploadSizes, setUploadSizes] = useState<string[]>([]);
//   const [numPages, setNumPages] = useState<number>(0);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [fileName, setFileName] = useState<string>('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormInputs(prevState => new Map(prevState).set(name, value));
//   };

//   // const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const files = event.target.files;
//   //   if (files) {
//   //     const fileArray = Array.from(files);
//   //     setSelectedFiles(fileArray);
//   //     setUploadProgress(new Array(fileArray.length).fill(0));
//   //     setUploadedFileNames(fileArray.map(file => file.name));
//   //     setUploadStatuses(new Array(fileArray.length).fill(''));
//   //     setUploadSizes(fileArray.map(file => `${(file.size / (1024 * 1024)).toFixed(2)} MB`));

//   //     // Process each file (you can implement file type checking logic here as well)
//   //     // ...
//   //   }
//   // };
//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       setSelectedFiles(fileArray);
//       setUploadProgress(new Array(fileArray.length).fill(0));
//       setUploadedFileNames(fileArray.map(file => file.name));
//       setUploadStatuses(new Array(fileArray.length).fill(''));
//       setUploadSizes(fileArray.map(file => `${(file.size / (1024 * 1024)).toFixed(2)} MB`));
     
//       setFileName(fileArray[0].name);

//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const content = e.target?.result;
//         if (content) {
//           const fileExtension = fileArray[0].name.split('.').pop()?.toLowerCase();
//           if (fileExtension === 'pdf') {
//             setFileContent(new Uint8Array(e.target?.result as ArrayBuffer));
//           } else if (fileExtension === 'docx') {
//             const arrayBuffer = e.target?.result as ArrayBuffer;
//             const result = await mammoth.convertToHtml({ arrayBuffer });
//             setFileContent(result.value);
//           }
//           onFileUpload({ fileName: fileArray[0].name, fileContent });
//         }
//       };
//       reader.readAsArrayBuffer(fileArray[0]);
//     }
//   };

//   const handleUploadSubmit = async () => {
//     if (selectedFiles.length > 0) {
//       const promises = selectedFiles.map(async (file, index) => {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//           const response = await axios.post('/api/v1/memo/upload', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//             onUploadProgress: (progressEvent: any) => {
//               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setUploadProgress(prev => {
//                 const newProgress = [...prev];
//                 newProgress[index] = percentCompleted;
//                 return newProgress;
//               });
//             },
//           });

//           const { id, fileName, fileSize, status } = response.data;
//           setUploadStatuses(prev => {
//             const newStatuses = [...prev];
//             newStatuses[index] = `File uploaded successfully: ${status}`;
//             return newStatuses;
//           });

//           console.log("This is the file ID:", id);
//           console.log("This is the file size:", fileSize);
//           console.log("This is the file name:", fileName);
//         } catch (error) {
//           console.error('Error uploading file:', error);
//           setUploadStatuses(prev => {
//             const newStatuses = [...prev];
//             newStatuses[index] = 'Upload failed.';
//             return newStatuses;
//           });
//         }
//       });

//       await Promise.all(promises);
//       setTimeout(() => setUploadProgress(new Array(selectedFiles.length).fill(0)), 2000);
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
//       <div style={{ display: 'flex' }}>
//         <div className={styles.doc}>
//           <div className={styles.upload}>
//             <UploadFiles
//               onChange={handleFileUpload}
//               uploadProgress={uploadProgress}
//               uploadedFileNames={uploadedFileNames}
//               uploadStatuses={uploadStatuses}
//               uploadSizes={uploadSizes}
//               onSubmit={handleUploadSubmit}
//               onFileNameClick={(index: number) => {
//                 const file = selectedFiles[index];
//                 const fileExtension = file.name.split('.').pop()?.toLowerCase();

//                 const reader = new FileReader();
//                 reader.onload = async (e) => {
//                   const content = e.target?.result;
//                   if (content) {
//                     if (fileExtension === 'pdf') {
//                       setFileContent(new Uint8Array(e.target?.result as ArrayBuffer));
//                     } else if (fileExtension === 'docx') {
//                       const arrayBuffer = e.target?.result as ArrayBuffer;
//                       const result = await mammoth.convertToHtml({ arrayBuffer });
//                       setFileContent(result.value);
//                     }
//                     setFileType(fileExtension || '');
//                     setIsModalOpen(true);
//                   }
//                 };

//                 if (file) {
//                   if (fileExtension === 'pdf' || fileExtension === 'docx') {
//                     reader.readAsArrayBuffer(file);
//                   } else {
//                     console.error('Unsupported file type:', fileExtension);
//                   }
//                 }
//               }}
//             />
//             {error && <p className={styles.error}>{error}</p>}
//           </div>
//         </div>
//       </div>
//       <FilePreviewModal 
//       isOpen={isModalOpen} 
//       fileType={fileType} 
//       content={fileContent} 
//       numPages={numPages}
//       onDocumentLoadSuccess={onDocumentLoadSuccess}
//       documentFile={documentFile}
//       onClose={() => setIsModalOpen(false)}>
//         {fileType === 'pdf' && <Document file={documentFile} onLoadSuccess={onDocumentLoadSuccess}>
//           {Array.from(new Array(numPages), (el, index) => (
//             <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//           ))}
//         </Document>}
//         {fileType === 'docx' && <div dangerouslySetInnerHTML={{ __html: fileContent as string }} />}
//       </FilePreviewModal>
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

interface DocProps {
  onFileUpload: (file: { fileName: string; fileContent: Uint8Array | string | null }) => void;
}

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

const Doc: React.FC<DocProps> = ({ onFileUpload }) => {
  const [formInputs, setFormInputs] = useState<Map<string, any>>(new Map());
  const [fileType, setFileType] = useState<string>('');
  const [fileContent, setFileContent] = useState<Uint8Array | string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);
  const [uploadStatuses, setUploadStatuses] = useState<string[]>([]);
  const [uploadSizes, setUploadSizes] = useState<string[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false); // Track if uploading

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs(prevState => new Map(prevState).set(name, value));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);

      setFileName(fileArray[0].name);
    }
  };

  const handleUploadSubmit = async () => {
    if (selectedFiles.length > 0) {
      setIsUploading(true); // Show file details and progress only after upload begins
      
      // Prepare upload details
      setUploadProgress(new Array(selectedFiles.length).fill(0));
      setUploadedFileNames(selectedFiles.map(file => file.name));
      setUploadStatuses(new Array(selectedFiles.length).fill(''));
      setUploadSizes(selectedFiles.map(file => `${(file.size / (1024 * 1024)).toFixed(2)} MB`));

      const promises = selectedFiles.map(async (file, index) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post('/api/v1/memo/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: any) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(prev => {
                const newProgress = [...prev];
                newProgress[index] = percentCompleted;
                return newProgress;
              });
            },
          });

          const { id, fileName, fileSize, status } = response.data;
          setUploadStatuses(prev => {
            const newStatuses = [...prev];
            newStatuses[index] = `File uploaded successfully: ${status}`;
            return newStatuses;
          });

        } catch (error) {
          console.error('Error uploading file:', error);
          setUploadStatuses(prev => {
            const newStatuses = [...prev];
            newStatuses[index] = 'Upload failed.';
            return newStatuses;
          });
        }
      });

      await Promise.all(promises);
      setTimeout(() => setUploadProgress(new Array(selectedFiles.length).fill(0)), 2000);
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
      <div style={{ display: 'flex' }}>
        <div className={styles.doc}>
          <div className={styles.upload}>
          <UploadFiles
              onChange={handleFileUpload}
              uploadProgress={uploadProgress}
              uploadedFileNames={uploadedFileNames}
              uploadStatuses={uploadStatuses}
              uploadSizes={uploadSizes}
              onSubmit={handleUploadSubmit}
              onFileNameClick={(index: number) => {
                const file = selectedFiles[index];
                const fileExtension = file.name.split('.').pop()?.toLowerCase();

                const reader = new FileReader();
                reader.onload = async (e) => {
                  const content = e.target?.result;
                  if (content) {
                    if (fileExtension === 'pdf') {
                      setFileContent(new Uint8Array(e.target?.result as ArrayBuffer));
                    } else if (fileExtension === 'docx') {
                      const arrayBuffer = e.target?.result as ArrayBuffer;
                      const result = await mammoth.convertToHtml({ arrayBuffer });
                      setFileContent(result.value);
                    }
                    setFileType(fileExtension || '');
                    setIsModalOpen(true);
                  }
                };

                if (file) {
                  if (fileExtension === 'pdf' || fileExtension === 'docx') {
                    reader.readAsArrayBuffer(file);
                  } else {
                    console.error('Unsupported file type:', fileExtension);
                  }
                }
              }}
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>

          {/* {isUploading && (
            <div className={styles.fileDetails}>
              {uploadedFileNames.map((name, index) => (
                <div key={index} className={styles.fileItem}>
                  <div>{name}</div>
                  <div>Size: {uploadSizes[index]}</div>
                  <div>Progress: {uploadProgress[index]}%</div>
                  <div>Status: {uploadStatuses[index]}</div>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>

      <FilePreviewModal
        isOpen={isModalOpen}
        fileType={fileType}
        content={fileContent}
        numPages={numPages}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        documentFile={documentFile}
        onClose={() => setIsModalOpen(false)}
      >
        {fileType === 'pdf' && (
          <Document file={documentFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
        {fileType === 'docx' && <div dangerouslySetInnerHTML={{ __html: fileContent as string }} />}
      </FilePreviewModal>
    </>
  );
};

export default Doc;
