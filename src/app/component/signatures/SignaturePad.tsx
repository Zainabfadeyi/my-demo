import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad: React.FC<{ onSave: (signature: string) => void }> = ({ onSave }) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const saveSignature = () => {
    if (sigCanvas.current) {
      const signature = sigCanvas.current.toDataURL();
      onSave(signature);
    }
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
      <button onClick={saveSignature}>Save</button>
      <button onClick={clearSignature}>Clear</button>
    </div>
  );
};

export default SignaturePad;
