import React, { useState } from 'react';
import Templates from '../formComp/Templates'; // Adjust the import path as necessary
import Template from '../../pages/Template'; // Adjust the import path as necessary

const DocumentManager: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const handleDocumentSelect = (documentUrl: string) => {
    console.log("Document URL selected:", documentUrl);  // Debugging log
    setSelectedDocument(documentUrl);  // Set the document URL when a template is selected
  };
  return (
    <div>
      <Templates onSelectDocument={handleDocumentSelect} />
      {/* Render Template component if document is selected */}
      
    </div>
  );
};

export default DocumentManager;