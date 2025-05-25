// src/global.d.ts
import 'react';

declare module 'react' {
  interface CSSProperties {
    '--tileMoveX'?: string;
    '--tileMoveY'?: string;
  }
}