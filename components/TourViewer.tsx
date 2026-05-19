'use client';

import { useEffect, useRef } from 'react';

interface Props {
  tourUrl: string;
  isExternal: boolean;
}

export default function TourViewer({ tourUrl, isExternal }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExternal || !containerRef.current) return;

    let viewer: { destroy?: () => void } | null = null;

    import('pannellum').then((module) => {
      const pannellum = module.default ?? module;
      viewer = pannellum.viewer(containerRef.current, {
        type: 'equirectangular',
        panorama: tourUrl,
        autoLoad: true,
        autoRotate: -2,
        showControls: true,
        compass: false,
        mouseZoom: true,
        hfov: 100,
      });
    });

    return () => {
      viewer?.destroy?.();
    };
  }, [tourUrl, isExternal]);

  if (isExternal) {
    return (
      <iframe
        src={tourUrl}
        className="w-full h-full border-0"
        allow="xr-spatial-tracking; fullscreen"
        title="360° тур"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      aria-label="360° панорамный тур"
    />
  );
}
