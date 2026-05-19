import type { DriveFile } from "../../types";
import { formatBytes, getFileIcon } from "../../lib/manifest";

interface FileGridProps {
  files: DriveFile[];
  loading: boolean;
  onDownload: (file: DriveFile) => void;
  onPreview: (file: DriveFile) => void;
  onRename?: (file: DriveFile) => void;
  onDelete?: (file: DriveFile) => void;
}

export function FileGrid({ files, loading, onDownload, onPreview, onRename, onDelete }: FileGridProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="glass rounded-xl p-4 flex items-center gap-4 animate-pulse"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-300" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-surface-300 rounded w-1/3" />
              <div className="h-3 bg-surface-300 rounded w-1/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
        <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
          {/* Background glowing circle */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-500/10 to-accent-500/10 blur-xl animate-pulse" />
          
          {/* Animated floating particles */}
          <div className="absolute top-4 left-6 w-2.5 h-2.5 rounded-full bg-accent-400/40 animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-brand-400/30 animate-bounce" style={{ animationDelay: "0.7s" }} />
          
          <svg className="w-24 h-24 relative z-10 drop-shadow-2xl" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="cloud-glow" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#6c63ff" />
                <stop offset="100%" stopColor="#00d2ff" />
              </linearGradient>
            </defs>
            {/* Dynamic Glass Cloud Grid Outline */}
            <path
              d="M32 64h36a16 16 0 005-31 16 16 0 00-29-11 19 19 0 00-27 16 14 14 0 0015 26z"
              stroke="url(#cloud-glow)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="url(#cloud-glow)"
              fillOpacity="0.06"
              className="animate-pulse"
            />
            {/* Empty Folder base */}
            <path
              d="M25 75h50v6a4 4 0 01-4 4H29a4 4 0 01-4-4v-6z"
              fill="#94a3b8"
              fillOpacity="0.2"
            />
            <path
              d="M20 75l7-20a2 2 0 012-1h42a2 2 0 012 1l7 20H20z"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="#cbd5e1"
              fillOpacity="0.1"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="54" r="5" fill="#6c63ff" className="animate-ping" style={{ animationDuration: "3s" }} />
          </svg>
        </div>
        <p className="text-surface-700 font-medium mb-1">No files in this folder</p>
        <p className="text-surface-600 text-sm max-w-[280px]">
          Drag & drop files anywhere on the screen to start uploading instantly
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {/* Table header */}
      <div className="flex items-center gap-4 px-4 py-2 text-[11px] uppercase tracking-wider text-surface-600 font-semibold">
        <div className="w-10" />
        <div className="flex-1">Name</div>
        <div className="w-24 text-right hidden sm:block">Size</div>
        <div className="w-28 text-right hidden md:block">Date</div>
        <div className="w-32" />
      </div>

      {files.map((file, idx) => (
        <div
          key={file.id}
          className="glass glass-hover rounded-xl px-4 py-3 flex items-center gap-4 transition-all duration-200 animate-slide-up group cursor-pointer"
          style={{ animationDelay: `${idx * 20}ms` }}
          onClick={() => onPreview(file)}
        >
          {/* File icon */}
          <div className="w-10 h-10 rounded-xl bg-surface-200 flex items-center justify-center text-lg shrink-0">
            {getFileIcon(file.name)}
          </div>

          {/* File name */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-900 truncate">
              {file.name}
            </p>
            <p className="text-[11px] text-surface-600 sm:hidden">
              {formatBytes(file.size)}
            </p>
          </div>

          {/* Size */}
          <div className="w-24 text-right text-sm text-surface-700 hidden sm:block">
            {formatBytes(file.size)}
          </div>

          {/* Date */}
          <div className="w-28 text-right text-sm text-surface-700 hidden md:block">
            {new Date(file.date * 1000).toLocaleDateString()}
          </div>

          {/* Actions */}
          <div className="w-32 flex justify-end gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(file);
              }}
              className="p-2 rounded-lg hover:bg-brand-400/10 text-surface-600 hover:text-brand-400 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
              title="Preview"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(file);
              }}
              className="p-2 rounded-lg hover:bg-brand-400/10 text-surface-600 hover:text-brand-400 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
              title="Download"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
            {onRename && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRename(file);
                }}
                className="p-2 rounded-lg hover:bg-accent-400/10 text-surface-600 hover:text-accent-400 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                title="Rename"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                  />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(file);
                }}
                className="p-2 rounded-lg hover:bg-danger/10 text-surface-600 hover:text-danger transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                title="Delete"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
