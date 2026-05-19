import { PhoneStep } from "./PhoneStep";
import { OtpStep } from "./OtpStep";
import { PasswordStep } from "./PasswordStep";
import type { AuthState } from "../../types";

interface AuthWizardProps {
  state: AuthState;
  onPhoneSubmit: (phone: string) => void;
  onOtpSubmit: (code: string) => void;
  onPasswordSubmit: (password: string) => void;
}

export function AuthWizard({
  state,
  onPhoneSubmit,
  onOtpSubmit,
  onPasswordSubmit,
}: AuthWizardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-brand-400/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/3 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#6c63ff" />
                  <stop offset="100%" stopColor="#00d2ff" />
                </linearGradient>
              </defs>
              <rect
                width="32"
                height="32"
                rx="8"
                fill="url(#logo-grad)"
                opacity="0.15"
              />
              <path
                d="M8 12l8-4 8 4v8l-8 4-8-4v-8z"
                stroke="url(#logo-grad)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M16 8v16M8 12l8 4 8-4"
                stroke="url(#logo-grad)"
                strokeWidth="1.5"
              />
            </svg>
            <span className="text-xl font-bold gradient-text">
              TG Cloud Drive
            </span>
          </div>
          <p className="text-surface-600 text-xs">
            Infinite storage, zero servers
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["phone", "otp", "password"] as const).map((step, i) => {
            const stepIdx = ["phone", "otp", "password"].indexOf(state.step);
            const currentIdx = i;
            const isActive = currentIdx === stepIdx;
            const isDone = currentIdx < stepIdx;

            return (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "gradient-brand text-white shadow-lg shadow-brand-400/30"
                      : isDone
                        ? "bg-success/20 text-success border border-success/30"
                        : "bg-surface-300 text-surface-600 border border-surface-400"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </div>
                {i < 2 && (
                  <div
                    className={`w-8 h-0.5 rounded-full transition-all duration-300 ${
                      isDone ? "bg-success/40" : "bg-surface-400"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Auth card */}
        <div className="glass rounded-2xl p-8 glow-brand">
          {state.step === "phone" && (
            <PhoneStep
              loading={state.loading}
              error={state.error}
              onSubmit={onPhoneSubmit}
            />
          )}
          {state.step === "otp" && (
            <OtpStep
              phone={state.phone}
              loading={state.loading}
              error={state.error}
              onSubmit={onOtpSubmit}
            />
          )}
          {state.step === "password" && (
            <PasswordStep
              loading={state.loading}
              error={state.error}
              onSubmit={onPasswordSubmit}
            />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-surface-600 mt-6">
          Powered by Telegram MTProto • End-to-end encrypted
        </p>
      </div>
    </div>
  );
}
