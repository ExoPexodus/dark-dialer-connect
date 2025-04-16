
import { exec } from 'child_process';

export const executeCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      console.log('[ExecCommand] Command output:', stdout);
      
      if (error) {
        console.error('[ExecCommand] Error executing command:', error);
        reject(error);
        return;
      }
      
      if (stderr) {
        console.warn('[ExecCommand] Command stderr:', stderr);
      }
      
      resolve(stdout);
    });
  });
};
