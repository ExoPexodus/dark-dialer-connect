
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Phone } from "lucide-react";

interface CallFormActionsProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onClear: () => void;
}

const CallFormActions = ({ isLoading, onSubmit, onClear }: CallFormActionsProps) => {
  return (
    <CardFooter className="flex flex-col gap-4">
      <Button 
        onClick={onSubmit}
        disabled={isLoading} 
        className="w-full pulse-effect bg-primary hover:bg-primary/90 text-white font-medium py-6 rounded-lg transition-all"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting Voice Agent...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Phone size={18} />
            Initiate Voice Call
          </span>
        )}
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClear}
        className="w-full bg-transparent border-white/10 hover:bg-background/20"
      >
        Clear
      </Button>
    </CardFooter>
  );
};

export default CallFormActions;
