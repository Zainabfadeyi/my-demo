import React, { useState } from 'react';
import axios from 'axios';
import { PDFDocument, rgb } from 'pdf-lib';
import SignaturePad from './SignaturePad';

const FillAndSignPDF: React.FC = () => {
  const [signature, setSignature] = useState<string | null>(null);

  const fillPdf = async () => {
    const memo = {
      subject: "Subject",
      recipient: "Recipient",
      description: "Description",
      dateCreated: new Date(),
      status: "Draft",
      createdBy: "user1"
    };

    const response = await axios.post('/api/memos', memo);
    const { data: savedMemo } = response;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    page.drawText(`Date: ${new Date(savedMemo.dateCreated).toLocaleDateString()}`, { x: 50, y: height - 50, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Subject: ${savedMemo.subject}`, { x: 50, y: height - 70, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Recipient: ${savedMemo.recipient}`, { x: 50, y: height - 90, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Description: ${savedMemo.description}`, { x: 50, y: height - 110, size: 12, color: rgb(0, 0, 0) });

    if (signature) {
      const pngImage = await pdfDoc.embedPng(signature);
      page.drawImage(pngImage, { x: 50, y: 50, width: 200, height: 100 });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div>
      <SignaturePad onSave={setSignature} />
      <button onClick={fillPdf}>Fill and Sign PDF</button>
    </div>
  );
};

export default FillAndSignPDF;
