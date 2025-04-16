
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NameInput from './form/NameInput';
import PhoneInput from './form/PhoneInput';
import BotTypeSelect from './form/BotTypeSelect';
import CallFormActions from './form/CallFormActions';
import { useCallForm } from '@/hooks/useCallForm';

const CallForm = () => {
  const {
    formData,
    isLoading,
    errors,
    handleChange,
    handleBotTypeChange,
    handleSubmit,
    handleClear
  } = useCallForm();

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
      <CallFormActions 
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />
    </Card>
  );
};

export default CallForm;
