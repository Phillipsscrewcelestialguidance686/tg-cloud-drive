import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  onDrop: (files: File[]) => void;
  disabled?: boolean;
}

export function UploadZone({ onDrop, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) {
        onDrop(droppedFiles);
      }
    },
    [onDrop, disabled]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        onDrop(selectedFiles);
      }
      e.target.value = "";
    },
    [onDrop]
  );

  const handleZoneClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleZoneClick}
      className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 text-center cursor-pointer group ${
        isDragging
          ? "border-brand-400 bg-brand-400/5 scale-[1.01]"
          : "border-surface-400 hover:border-surface-500 hover:bg-surface-200/50"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Hidden file input — pointer-events-none so it never intercepts drag-and-drop */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={true}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      <div
        className={`flex flex-col items-center gap-3 pointer-events-none transition-transform duration-300 ${
          isDragging ? "scale-105" : ""
        }`}
      >
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragging
              ? "gradient-brand shadow-lg shadow-brand-400/30"
              : "bg-surface-300 group-hover:bg-surface-400"
          }`}
        >
          <svg
            className={`w-7 h-7 transition-colors ${
              isDragging ? "text-white" : "text-surface-700"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <div>
          <p className="text-sm font-medium text-surface-900">
            {isDragging ? "Drop files here" : "Drag & drop files"}
          </p>
          <p className="text-xs text-surface-600 mt-1">
            or click to browse • No size limits
          </p>
        </div>
      </div>
    </div>
  );
}
