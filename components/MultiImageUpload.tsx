"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function MultiImageUpload({ initialImages = [] }: { initialImages?: { url: string }[] }) {
  const [previews, setPreviews] = useState<string[]>(initialImages.map(img => img.url));
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // We use a hidden input that actually stores the files for the form submission
  // But wait, standard file inputs are read-only. We can't manually set their value.
  // To bypass this, we can use the "DataTransfer" trick to update the input's files.
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // ADDITIVE: We add new files to the existing ones
    const updatedFiles = [...selectedFiles, ...files].slice(0, 10);
    setSelectedFiles(updatedFiles);
    
    // Update previews
    const newPreviews = updatedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  // Synchronize the real hidden input with our state
  useEffect(() => {
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      selectedFiles.forEach(file => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [selectedFiles]);

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    
    // If it was an initial image (URL), we just remove from preview
    // Actually, if we selected NEW files, we only show those.
    // If it's the edit mode, we'd need to handle deletions. 
    // For now, let's focus on the ADDITIVE selection of new files.
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="grid gap-6">
      
      {/* SELECTION BOX */}
      <div 
        className="relative group border-2 border-dashed border-ink/10 rounded-lg p-10 text-center hover:border-gold/30 transition-colors bg-void-2/30"
        style={{ cursor: "pointer" }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-void-3 flex items-center justify-center text-gold">
            <svg style={{ width: "1.5rem", height: "1.5rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-ink">Fotoğraf Ekle</p>
            <p className="text-xs text-ink-ghost mt-1">Tek tek veya toplu halde seçebilirsiniz (Maks 10)</p>
          </div>
        </div>
        
        {/* The REAL input that will be sent to the server */}
        <input
          ref={fileInputRef}
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* PREVIEWS GRID */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {previews.map((src, i) => (
            <div key={i} className="relative aspect-square border rounded-md overflow-hidden bg-white shadow-sm group">
              <Image src={src} alt="Preview" fill className="object-cover" />
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
              {i === 0 && (
                <div className="absolute top-0 left-0 bg-gold text-white text-[8px] px-1.5 py-0.5 rounded-br font-bold">
                  KAPAK
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <p className="text-xs font-bold text-gold-deep">
          ✓ {selectedFiles.length} yeni fotoğraf yüklenecek.
        </p>
      )}
    </div>
  );
}
