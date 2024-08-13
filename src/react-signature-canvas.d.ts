declare module 'react-signature-canvas' {
    import * as React from 'react';
  
    export interface SignatureCanvasProps {
      canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
      clearOnResize?: boolean;
      backgroundColor?: string;
      penColor?: string;
      dotSize?: number;
      minWidth?: number;
      maxWidth?: number;
      throttle?: number;
      minDistance?: number;
      velocityFilterWeight?: number;
      onEnd?: () => void;
      onBegin?: () => void;
    }
  
    export default class SignatureCanvas extends React.Component<SignatureCanvasProps> {
      clear(): void;
      isEmpty(): boolean;
      fromDataURL(dataURL: string): void;
      toDataURL(type?: string, encoderOptions?: number): string;
      fromData(data: Array<{}>): void;
      toData(): Array<{}>;
    }
  }
  