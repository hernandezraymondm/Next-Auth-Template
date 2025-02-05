"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
}

export const OtpInput = ({ value, loading, onChange }: OtpInputProps) => {
  return (
    <InputOTP
      value={value}
      onChange={onChange}
      maxLength={6}
      disabled={loading}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};
