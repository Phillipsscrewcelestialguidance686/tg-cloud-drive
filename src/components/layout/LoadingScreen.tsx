interface LoadingScreenProps {
  message?: string;
  subtext?: string;
}

export function LoadingScreen({
  message = "Initializing",
  subtext,
}: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 animate-fade-in">
      {/* Animated loader */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-surface-400" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-400 border-r-accent-400"
          style={{ animation: "spin 1s linear infinite" }}
        />
        <div className="absolute inset-2 rounded-full bg-surface-100 flex items-center justify-center">
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="load-grad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#6c63ff" />
                <stop offset="100%" stopColor="#00d2ff" />
              </linearGradient>
            </defs>
            <path
              d="M8 12l8-4 8 4v8l-8 4-8-4v-8z"
              stroke="url(#load-grad)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <p className="text-surface-900 font-medium">{message}</p>
        {subtext && (
          <p className="text-surface-600 text-sm animate-pulse-slow">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
