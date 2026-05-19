import type { TopicFolder } from "../../types";

interface TopicListProps {
  folders: TopicFolder[];
  onFolderClick: (id: number) => void;
  onRenameFolder: (folder: TopicFolder) => void;
  onDeleteFolder: (id: number) => void;
}

export function TopicList({
  folders,
  onFolderClick,
  onRenameFolder,
  onDeleteFolder,
}: TopicListProps) {
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

  if (folders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-surface-200 flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-surface-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>
        <p className="text-surface-700 font-medium mb-1">No folders yet</p>
        <p className="text-surface-600 text-sm">
          Create your first folder to start organizing files
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
      {folders.map((folder, idx) => (
        <div
          key={folder.id}
          onClick={() => onFolderClick(folder.id)}
          className="glass rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:bg-surface-200/80 hover:border-surface-500/50 group animate-slide-up"
          style={{ animationDelay: `${idx * 30}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${folderColors[idx % folderColors.length]}15`,
                color: folderColors[idx % folderColors.length],
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRenameFolder(folder);
                }}
                className="p-1.5 rounded-lg hover:bg-accent-400/10 text-surface-600 hover:text-accent-400 transition-all"
                title="Rename folder"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFolder(folder.id);
                }}
                className="p-1.5 rounded-lg hover:bg-danger/10 text-surface-600 hover:text-danger transition-all"
                title="Delete folder"
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
            </div>
          </div>

          <p className="text-sm font-semibold text-surface-900 truncate">
            {folder.title}
          </p>
          <p className="text-[11px] text-surface-600 mt-0.5">
            {new Date(folder.date * 1000).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
