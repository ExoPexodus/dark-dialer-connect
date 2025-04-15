
import React from 'react';
import { Label } from "@/components/ui/label";
import { Bot, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { botTypeCommandMap } from '@/utils/commandExecutor';

interface BotTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const BotTypeSelect = ({ value, onChange, error }: BotTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Label htmlFor="botType" className="text-sm font-medium flex items-center gap-2">
          <Bot size={16} className="text-primary" />
          Voice Agent
        </Label>
        {error && (
          <span className="text-xs text-destructive ml-auto flex items-center">
            <X size={12} className="mr-1" /> {error}
          </span>
        )}
      </div>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger 
          className={`w-full bg-background/50 border-muted focus:border-primary ${
            error ? 'border-destructive' : ''
          }`}
        >
          <SelectValue placeholder="Select a voice agent" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(botTypeCommandMap).map(([key, { agentName }]) => (
            <SelectItem key={key} value={key}>{agentName}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BotTypeSelect;
