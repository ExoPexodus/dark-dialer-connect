
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Phone, User, X, Bot } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {
  name: string;
  phoneNumber: string;
  botType: string;
}

interface BotTypeCommandMap {
  [key: string]: {
    command: string;
    agentName: string;
  };
}

const CallForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    botType: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Define mapping between bot types and CLI commands
  const botTypeCommandMap: BotTypeCommandMap = {
    'openai-multimodal-bot': {
      command: 'lk dispatch create --new-room --agent-name outbound-multimodel-caller',
      agentName: 'OpenAI Multimodal Bot'
    },
    'openai-multimodal-hindi-bot': {
      command: 'lk dispatch create --new-room --agent-name outbound-multimodel-hindi-caller',
      agentName: 'OpenAI Multimodal Bot (Hindi)'
    },
    'azure-based-voice-bot': {
      command: 'lk dispatch create --new-room --agent-name outbound-azure-caller',
      agentName: 'Azure Based Voice Bot'
    }
  };

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
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBotTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      botType: value
    }));
    
    // Clear error when selecting
    if (errors.botType) {
      setErrors(prev => ({
        ...prev,
        botType: undefined
      }));
    }
  };

  const executeCliCommand = (botType: string, phoneNumber: string, name: string) => {
    const botConfig = botTypeCommandMap[botType];
    if (!botConfig) return;

    // Construct the metadata JSON
    const metadata = JSON.stringify({
      phone_number: phoneNumber,
      company_name: "Maxicus",
      candidate_name: name
    });

    // Construct the full command
    const fullCommand = `${botConfig.command} --metadata '${metadata}'`;
    
    console.log("Executing command:", fullCommand);
    
    // In a real implementation, you would use a backend API to execute this command
    // For now, we'll just simulate it with a console log
    return fullCommand;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Get the command to be executed
    const command = executeCliCommand(
      formData.botType,
      formData.phoneNumber,
      formData.name
    );
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      const selectedBotName = botTypeCommandMap[formData.botType]?.agentName || formData.botType;
      
      toast.success(`Initiating call with ${selectedBotName} to ${formData.phoneNumber}`, {
        description: `Call initiated by ${formData.name}. Command: ${command}`,
        position: "top-center",
      });
      
      // You would typically initiate the actual call here via an API
      console.log('Initiating call with details:', formData);
      console.log('CLI Command:', command);
    }, 1500);
  };

  const handleClear = () => {
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
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User size={16} className="text-primary" />
                Initiator Name
              </Label>
              {errors.name && (
                <span className="text-xs text-destructive ml-auto flex items-center">
                  <X size={12} className="mr-1" /> {errors.name}
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`bg-background/50 border-muted focus:border-primary ${
                  errors.name ? 'border-destructive' : ''
                }`}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                Customer Phone Number
              </Label>
              {errors.phoneNumber && (
                <span className="text-xs text-destructive ml-auto flex items-center">
                  <X size={12} className="mr-1" /> {errors.phoneNumber}
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter customer phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`bg-background/50 border-muted focus:border-primary ${
                  errors.phoneNumber ? 'border-destructive' : ''
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="botType" className="text-sm font-medium flex items-center gap-2">
                <Bot size={16} className="text-primary" />
                Voice Agent
              </Label>
              {errors.botType && (
                <span className="text-xs text-destructive ml-auto flex items-center">
                  <X size={12} className="mr-1" /> {errors.botType}
                </span>
              )}
            </div>
            <Select
              value={formData.botType}
              onValueChange={handleBotTypeChange}
            >
              <SelectTrigger 
                className={`w-full bg-background/50 border-muted focus:border-primary ${
                  errors.botType ? 'border-destructive' : ''
                }`}
              >
                <SelectValue placeholder="Select a voice agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai-multimodal-bot">OpenAI Multimodal Bot</SelectItem>
                <SelectItem value="openai-multimodal-hindi-bot">OpenAI Multimodal Bot (Hindi)</SelectItem>
                <SelectItem value="azure-based-voice-bot">Azure Based Voice Bot</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
