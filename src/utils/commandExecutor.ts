
export interface BotTypeConfig {
  command: string;
  agentName: string;
}

export interface BotTypeCommandMap {
  [key: string]: BotTypeConfig;
}

export const botTypeCommandMap: BotTypeCommandMap = {
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

export const executeCliCommand = (botType: string, phoneNumber: string, name: string): string => {
  console.log(`[CommandExecutor] Executing command for bot type: ${botType}`);
  
  const botConfig = botTypeCommandMap[botType];
  if (!botConfig) {
    console.error(`[CommandExecutor] Error: Invalid bot type '${botType}'`);
    return '';
  }

  console.log(`[CommandExecutor] Bot config found: ${botConfig.agentName}`);
  
  const metadata = JSON.stringify({
    phone_number: phoneNumber,
    company_name: "Maxicus",
    candidate_name: name
  });

  console.log(`[CommandExecutor] Metadata: ${metadata}`);
  
  const fullCommand = `${botConfig.command} --metadata '${metadata}' --api-key devkey --api-secret secret`;
  console.log(`[CommandExecutor] Generated command: ${fullCommand}`);
  
  return fullCommand;
};

