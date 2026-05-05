"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageGallery({ images, title }: { images: { url: string }[], title: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const nextImage = () => setSelectedIndex(prev => (prev !== null && prev < images.length - 1) ? prev + 1 : 0);
  const prevImage = () => setSelectedIndex(prev => (prev !== null && prev > 0) ? prev - 1 : images.length - 1);

  return (
    <>
      {/* ══ PRIMARY PHOTO ════════════════════════════════ */}
      <div className="reveal-up delay-2">
        <div 
          className="relative aspect-[16/10] overflow-hidden bg-void-2 shadow-xl cursor-zoom-in group"
          onClick={() => setSelectedIndex(0)}
          style={{ border: "1px solid rgba(28,23,18,0.05)" }}
        >
          <Image
            src={images[0].url}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </div>

      {/* ══ ALL PHOTOS GRID (Excluding First) ═══════════ */}
      {images.length > 1 && (
        <div className="reveal-up delay-3 mt-8">
          <div className="grid grid-cols-2 gap-8">
            {images.slice(1).map((img, i) => (
              <div 
                key={i} 
                className="relative aspect-[4/3] overflow-hidden bg-void-2 shadow-lg cursor-zoom-in group"
                onClick={() => setSelectedIndex(i + 1)}
                style={{ border: "1px solid rgba(28,23,18,0.05)" }}
              >
                <Image 
                  src={img.url} 
                  alt="" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ LIGHTBOX MODAL ═══════════════════════════════ */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/60 hover:text-white text-4xl"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>
          
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-5xl"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            ‹
          </button>
          
          <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={images[selectedIndex].url} 
              alt="" 
              fill 
              className="object-contain"
              quality={100}
            />
          </div>

          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-5xl"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-mono text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
