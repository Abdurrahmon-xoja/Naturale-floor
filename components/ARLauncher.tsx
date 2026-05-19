'use client';

import { useEffect, useRef } from 'react';
import React from 'react';

type ModelViewerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  'ios-src'?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'shadow-intensity'?: string;
  alt?: string;
  loading?: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerProps;
    }
  }
}

interface Props {
  glbSrc: string;
  usdzSrc?: string;
  productName: string;
}

export default function ARLauncher({ glbSrc, usdzSrc, productName }: Props) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    import('@google/model-viewer');
  }, []);

  return (
    <model-viewer
      src={glbSrc}
      ios-src={usdzSrc}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      alt={productName}
      loading="eager"
      style={{ width: '100%', height: '100%' }}
    >
      <button
        slot="ar-button"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-walnut text-cream px-6 py-3 rounded-full font-semibold shadow-lg min-h-[48px]"
      >
        📱 Открыть в AR
      </button>
    </model-viewer>
  );
}
