interface ProgressBarProps {
  value: number; // 0-100
  size?: "sm" | "md";
  color?: "brand" | "accent" | "success";
}

export function ProgressBar({
  value,
  size = "md",
  color = "brand",
}: ProgressBarProps) {
  const heights: Record<string, string> = {
    sm: "h-1",
    md: "h-2",
  };

  const colors: Record<string, string> = {
    brand: "from-brand-400 to-brand-600",
    accent: "from-accent-400 to-accent-600",
    success: "from-emerald-400 to-emerald-600",
  };

  return (
    <div
      className={`w-full bg-surface-300 rounded-full overflow-hidden ${heights[size]}`}
    >
      <div
        className={`${heights[size]} rounded-full bg-gradient-to-r ${colors[color]} transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
