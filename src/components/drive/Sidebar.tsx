import type { TopicFolder } from "../../types";
import { Button } from "../ui/Button";

interface SidebarProps {
  folders: TopicFolder[];
  activeFolderId: number | null;
  onFolderClick: (id: number) => void;
  onCreateFolder: () => void;
  onBackToRoot: () => void;
}

export function Sidebar({
  folders,
  activeFolderId,
  onFolderClick,
  onCreateFolder,
  onBackToRoot,
}: SidebarProps) {
  const folderColors = [
    "#6c63ff",
    "#00d2ff",
    "#34d399",
    "#fbbf24",
    "#f87171",
    "#a78bfa",
    "#fb923c",
    "#38bdf8",
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-surface-300/50 bg-surface-100/50 h-[calc(100vh-4rem)]">
      <div className="p-4">
        <Button onClick={onCreateFolder} className="w-full" size="md">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Folder
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        {/* All files root */}
        <button
          onClick={onBackToRoot}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
            activeFolderId === null
              ? "bg-brand-400/10 text-brand-400 border border-brand-400/20"
              : "text-surface-800 hover:bg-surface-200 border border-transparent"
          }`}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="font-medium">My Drive</span>
        </button>

        <div className="pt-2 pb-1 px-3">
          <p className="text-[10px] uppercase tracking-wider text-surface-600 font-semibold">
            Folders
          </p>
        </div>

        {folders.map((folder, idx) => (
          <button
            key={folder.id}
            onClick={() => onFolderClick(folder.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
              activeFolderId === folder.id
                ? "bg-brand-400/10 text-brand-400 border border-brand-400/20"
                : "text-surface-800 hover:bg-surface-200 border border-transparent"
            }`}
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0"
              style={{
                backgroundColor: `${folderColors[idx % folderColors.length]}20`,
                color: folderColors[idx % folderColors.length],
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </div>
            <span className="truncate font-medium">{folder.title}</span>
          </button>
        ))}

        {folders.length === 0 && (
          <div className="px-3 py-6 text-center">
            <p className="text-xs text-surface-600">No folders yet</p>
            <p className="text-[10px] text-surface-500 mt-1">
              Create your first folder to start organizing
            </p>
          </div>
        )}
      </nav>

      {/* Storage info */}
      <div className="p-4 border-t border-surface-300/50 space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-surface-600">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <span>∞ Unlimited Storage</span>
        </div>
        
        <div className="text-[10px] text-surface-500 font-bold tracking-wider uppercase border-t border-surface-200/50 pt-2 text-center">
          ⚡ Made by ajisth
        </div>
      </div>
    </aside>
  );
}
