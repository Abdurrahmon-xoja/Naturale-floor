'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative w-full aspect-[16/10] bg-cream overflow-hidden">
        <Image
          key={active}
          src={images[active]}
          alt={`${alt} — фото ${active + 1}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/placeholder-wood.jpg';
          }}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="gallery-strip flex gap-2 overflow-x-auto px-4 py-3 bg-cream">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                active === i ? 'border-walnut' : 'border-transparent'
              }`}
              aria-label={`Фото ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/placeholder-wood.jpg';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
