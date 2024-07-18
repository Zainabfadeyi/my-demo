// import React, { useState, ChangeEvent, FormEvent } from 'react';
// // Import the main component
// import { Viewer } from '@react-pdf-viewer/core'; // install this library
// // Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// // Worker
// import { Worker } from '@react-pdf-viewer/core'; // install this library

// const Test: React.FC = () => {

//   // Create new plugin instance
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
//   // for onchange event
//   const [pdfFile, setPdfFile] = useState<string | ArrayBuffer | null>(null);
//   const [pdfFileError, setPdfFileError] = useState<string>('');

//   // for submit event
//   const [viewPdf, setViewPdf] = useState<string | ArrayBuffer | null>(null);

//   // accepted file types
//   const fileType = ['application/pdf'];

//   // onchange event
//   const handlePdfFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       if (fileType.includes(selectedFile.type)) {
//         const reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend = (event) => {
//           setPdfFile(event.target?.result ?? null);
//           setPdfFileError('');
//         }
//       } else {
//         setPdfFile(null);
//         setPdfFileError('Please select a valid PDF file');
//       }
//     } else {
//       console.log('Please select your file');
//     }
//   }

//   // form submit
//   const handlePdfFileSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (pdfFile !== null) {
//       setViewPdf(pdfFile);
//     } else {
//       setViewPdf(null);
//     }
//   }

//   return (
//     <div className='container'>
//       <br />
//       <form className='form-group' onSubmit={handlePdfFileSubmit}>
//         <input type="file" className='form-control' required onChange={handlePdfFileChange} />
//         {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
//         <br />
//         <button type="submit" className='btn btn-success btn-lg'>UPLOAD</button>
//       </form>
//       <br />
//       <h4>View PDF</h4>
//       <div className='pdf-container'>
//         {/* show pdf conditionally (if we have one) */}
//         {viewPdf && (
//           <>
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//               <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
//             </Worker>
//           </>
//         )}
//         {/* if we don't have pdf or viewPdf state is null */}
//         {!viewPdf && <>No PDF file selected</>}
//       </div>
//     </div>
//   );
// }

// export default Test;
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Viewer } from '@react-pdf-viewer/core';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

// Set the global worker options for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const Test: React.FC = () => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [pdfFileError, setPdfFileError] = useState<string>('');

  // for submit event
  const [viewPdf, setViewPdf] = useState<string | null>(null);

  // accepted file types
  const fileType = ['application/pdf'];

  // onchange event
  const handlePdfFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (event) => {
          if (event.target?.result && typeof event.target.result === 'string') {
            setPdfFile(event.target.result);
            setPdfFileError('');
          }
        };
      } else {
        setPdfFile(null);
        setPdfFileError('Please select a valid PDF file');
      }
    } else {
      console.log('Please select your file');
    }
  };

  // form submit
  const handlePdfFileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  return (
    <div className='container'>
      <br />
      <form className='form-group' onSubmit={handlePdfFileSubmit}>
        <input type="file" className='form-control' required onChange={handlePdfFileChange} />
        {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
        <br />
        <button type="submit" className='btn btn-success btn-lg'>UPLOAD</button>
      </form>
      <br />
      <h4>View PDF</h4>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one) */}
        {viewPdf && (
          <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
        )}
        {/* if we don't have pdf or viewPdf state is null */}
        {!viewPdf && <>No PDF file selected</>}
      </div>
    </div>
  );
};

export default Test;
