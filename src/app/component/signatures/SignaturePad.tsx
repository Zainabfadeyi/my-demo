import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad: React.FC<{ onSave: (signature: string) => void }> = ({ onSave }) => {
  const sigCanvas = useRef<any>({});

  const saveSignature = () => {
    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    onSave(signature);
  };

  return (
    <div>
      <SignatureCanvas ref={sigCanvas} canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
      <button onClick={saveSignature}>Save Signature</button>
    </div>
  );
};

export default SignaturePad;
