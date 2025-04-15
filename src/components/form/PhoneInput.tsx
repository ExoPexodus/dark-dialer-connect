
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, X } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const PhoneInput = ({ value, onChange, error }: PhoneInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
          <Phone size={16} className="text-primary" />
          Customer Phone Number
        </Label>
        {error && (
          <span className="text-xs text-destructive ml-auto flex items-center">
            <X size={12} className="mr-1" /> {error}
          </span>
        )}
      </div>
      <div className="relative">
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter customer phone number"
          value={value}
          onChange={onChange}
          className={`bg-background/50 border-muted focus:border-primary ${
            error ? 'border-destructive' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
