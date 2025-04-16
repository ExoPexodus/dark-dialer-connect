
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Enable CORS for the React app
CORS(app)

@app.route('/execute', methods=['POST'])
def execute_command():
    try:
        data = request.json
        if not data or 'command' not in data:
            return jsonify({"error": "No command provided"}), 400

        command = data['command']
        logger.info(f"Received command: {command}")
        
        # Add security validation here
        # This is a basic example - in a real application,
        # you should implement proper security checks
        if not is_command_allowed(command):
            return jsonify({"error": "Command not allowed"}), 403
            
        # Execute command
        result = subprocess.run(
            command, 
            shell=True, 
            capture_output=True, 
            text=True
        )
        
        if result.returncode != 0:
            logger.error(f"Command failed: {result.stderr}")
            return jsonify({
                "output": result.stdout,
                "error": result.stderr,
                "status": "error"
            }), 500
        
        logger.info(f"Command executed successfully")
        return jsonify({
            "output": result.stdout,
            "status": "success"
        })
        
    except Exception as e:
        logger.exception("Error executing command")
        return jsonify({"error": str(e)}), 500

def is_command_allowed(command):
    """
    Validate if a command is allowed to execute.
    This is a simple example - in production, implement proper validation.
    """
    # Whitelist approach - only allow specific commands
    # This is a very basic example
    allowed_commands = [
        'lk dispatch create',
    ]
    
    return any(command.startswith(prefix) for prefix in allowed_commands)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
