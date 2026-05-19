import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface PasswordStepProps {
  loading: boolean;
  error: string | null;
  onSubmit: (password: string) => void;
}

export function PasswordStep({ loading, error, onSubmit }: PasswordStepProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onSubmit(password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2 mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-warning/10 border border-warning/20 flex items-center justify-center text-3xl mb-4">
          🛡️
        </div>
        <h2 className="text-2xl font-bold text-surface-900">
          Two-Factor Authentication
        </h2>
        <p className="text-surface-700 text-sm">
          Your account has a cloud password enabled
        </p>
      </div>

      <div className="relative">
        <Input
          label="Cloud Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your cloud password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error || undefined}
          autoFocus
          icon={
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-surface-600 hover:text-surface-900 transition-colors"
        >
          {showPassword ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Unlock Drive
      </Button>
    </form>
  );
}
