
# SIP VoiceBot Backend Server

This is a simple Flask backend server that executes commands for the SIP VoiceBot Dialer application.

## Setup

1. Install Python 3.8 or higher
2. Install dependencies:
```
pip install -r requirements.txt
```

## Running the server

```
python app.py
```

This will start the server on http://localhost:5000

## Security Considerations

⚠️ **Warning**: This server executes system commands. In a production environment:

1. Implement proper authentication and authorization
2. Use a more robust command validation mechanism
3. Run with restricted privileges
4. Consider containerization
5. Implement rate limiting and logging

## API Endpoints

### POST /execute

Executes a command on the server.

**Request body:**
```json
{
  "command": "lk dispatch create --new-room --agent-name outbound-multimodel-caller --metadata '{...}'"
}
```

**Response:**
```json
{
  "output": "Command output text",
  "status": "success"
}
```

**Error response:**
```json
{
  "error": "Error message",
  "status": "error"
}
```
