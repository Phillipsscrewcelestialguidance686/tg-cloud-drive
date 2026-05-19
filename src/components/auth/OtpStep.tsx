import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";

interface OtpStepProps {
  phone: string;
  loading: boolean;
  error: string | null;
  onSubmit: (code: string) => void;
}

export function OtpStep({ phone, loading, error, onSubmit }: OtpStepProps) {
  const [digits, setDigits] = useState<string[]>(Array(5).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (value && index === 4) {
      const code = newDigits.join("");
      if (code.length === 5) {
        onSubmit(code);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    if (pasted.length === 5) {
      onSubmit(pasted);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length === 5) {
      onSubmit(code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2 mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-400/10 border border-accent-400/20 flex items-center justify-center text-3xl mb-4">
          🔐
        </div>
        <h2 className="text-2xl font-bold text-surface-900">
          Verification Code
        </h2>
        <p className="text-surface-700 text-sm">
          We sent a code to your Telegram app
        </p>
        <p className="text-brand-400 text-sm font-mono">{phone}</p>
      </div>

      <div className="flex justify-center gap-3" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-12 h-14 text-center text-xl font-bold bg-surface-200 border border-surface-400 rounded-xl text-surface-900 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all duration-200"
          />
        ))}
      </div>

      {error && (
        <p className="text-danger text-sm text-center">{error}</p>
      )}

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Verify Code
      </Button>
    </form>
  );
}
