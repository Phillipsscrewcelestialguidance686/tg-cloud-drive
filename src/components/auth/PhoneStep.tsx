import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface PhoneStepProps {
  loading: boolean;
  error: string | null;
  onSubmit: (phone: string) => void;
}

export function PhoneStep({ loading, error, onSubmit }: PhoneStepProps) {
  const [phone, setPhone] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/[\s()-]/g, "");

    if (!cleaned.startsWith("+")) {
      setValidationError("Phone must start with country code (e.g. +91)");
      return;
    }
    if (cleaned.length < 10 || cleaned.length > 16) {
      setValidationError("Enter a valid international phone number");
      return;
    }

    setValidationError("");
    onSubmit(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2 mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl gradient-brand flex items-center justify-center text-3xl shadow-lg shadow-brand-400/30 mb-4">
          📱
        </div>
        <h2 className="text-2xl font-bold text-surface-900">Welcome Back</h2>
        <p className="text-surface-700 text-sm">
          Enter your Telegram phone number to get started
        </p>
      </div>

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+91 XXXXX XXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={validationError || error || undefined}
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        }
      />

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Continue with Telegram
      </Button>

      <p className="text-xs text-surface-600 text-center leading-relaxed">
        We'll send a verification code to your Telegram app.
        <br />
        Your data stays on your device — nothing leaves the browser.
      </p>
    </form>
  );
}
