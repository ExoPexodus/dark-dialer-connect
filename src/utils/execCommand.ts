
/**
 * Execute commands by sending requests to a Flask backend server.
 */
export const executeCommand = async (command: string): Promise<string> => {
  console.log('[ExecCommand] Sending command to Flask backend:', command);
  
  try {
    const response = await fetch('http://localhost:5000/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ExecCommand] API error:', errorText);
      throw new Error(`API error: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('[ExecCommand] Command execution response:', data);
    
    return data.output;
  } catch (error) {
    console.error('[ExecCommand] Error executing command via API:', error);
    throw error;
  }
};
