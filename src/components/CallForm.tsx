import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Phone } from "lucide-react";
import NameInput from './form/NameInput';
import PhoneInput from './form/PhoneInput';
import BotTypeSelect from './form/BotTypeSelect';
import { botTypeCommandMap, executeCliCommand } from '@/utils/commandExecutor';
import { executeCommand } from '@/utils/execCommand';

interface FormData {
  name: string;
  phoneNumber: string;
  botType: string;
}

const CallForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    botType: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.botType) {
      newErrors.botType = 'Please select a voicebot';
    }
    
    setErrors(newErrors);
    console.log("[CallForm] Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBotTypeChange = (value: string) => {
    console.log("[CallForm] Bot type selected:", value);
    setFormData(prev => ({
      ...prev,
      botType: value
    }));
    
    if (errors.botType) {
      setErrors(prev => ({
        ...prev,
        botType: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[CallForm] Form submission started with data:", formData);
    
    if (!validateForm()) {
      console.log("[CallForm] Form validation failed");
      return;
    }
    
    setIsLoading(true);
    console.log("[CallForm] Setting loading state to true");
    
    try {
      const command = executeCliCommand(
        formData.botType,
        formData.phoneNumber,
        formData.name
      );
      
      if (!command) {
        console.error("[CallForm] Failed to generate command");
        toast.error("Failed to generate command for the selected bot");
        setIsLoading(false);
        return;
      }
      
      console.log("[CallForm] Attempting to execute command:", command);
      
      const output = await executeCommand(command);
      console.log("[CallForm] Command execution completed:", output);
      
      const selectedBotName = botTypeCommandMap[formData.botType]?.agentName || formData.botType;
      
      toast.success(`Initiating call with ${selectedBotName} to ${formData.phoneNumber}`, {
        description: `Call initiated by ${formData.name}. Output: ${output}`,
        position: "top-center",
      });
      
      console.log(`[CallForm] Success toast shown for ${selectedBotName}`);
    } catch (error) {
      console.error("[CallForm] Error during command execution:", error);
      toast.error("Failed to initiate call", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    console.log("[CallForm] Form cleared");
    setFormData({
      name: '',
      phoneNumber: '',
      botType: ''
    });
    setErrors({});
  };

  return (
    <Card className="w-full max-w-md bg-secondary/50 border-[0.5px] border-white/10 shadow-xl backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-gradient text-3xl font-bold">SIP VoiceBot Dialer</CardTitle>
        <CardDescription className="text-muted-foreground">
          Connect customers with AI voice agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <NameInput 
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          
          <PhoneInput 
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />

          <BotTypeSelect 
            value={formData.botType}
            onChange={handleBotTypeChange}
            error={errors.botType}
          />
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          onClick={handleSubmit}
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
          onClick={handleClear}
          className="w-full bg-transparent border-white/10 hover:bg-background/20"
        >
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CallForm;
