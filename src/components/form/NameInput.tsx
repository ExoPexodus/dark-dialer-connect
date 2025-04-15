
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, X } from "lucide-react";

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const NameInput = ({ value, onChange, error }: NameInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
          <User size={16} className="text-primary" />
          Initiator Name
        </Label>
        {error && (
          <span className="text-xs text-destructive ml-auto flex items-center">
            <X size={12} className="mr-1" /> {error}
          </span>
        )}
      </div>
      <div className="relative">
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
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

export default NameInput;
