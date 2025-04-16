
import { useState } from 'react';
import { toast } from "sonner";
import { executeCommand } from '@/utils/execCommand';
import { botTypeCommandMap, executeCliCommand } from '@/utils/commandExecutor';

interface FormData {
  name: string;
  phoneNumber: string;
  botType: string;
}

interface FormErrors {
  name?: string;
  phoneNumber?: string;
  botType?: string;
}

export const useCallForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    botType: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
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
    
    if (errors[name as keyof FormErrors]) {
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

  return {
    formData,
    isLoading,
    errors,
    handleChange,
    handleBotTypeChange,
    handleSubmit,
    handleClear
  };
};
