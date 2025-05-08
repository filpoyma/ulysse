import { SVGProps } from 'react';

declare module '*.svg' {
  const content: React.FC<SVGProps<SVGElement>>;
  export default content;
} 