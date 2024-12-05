from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Create a model for the message payload
class Message(BaseModel):
    message: str

# Health check endpoint
@app.get("/api/health")
def health_check():
  return {"status": "OK"}

# Chat endpoint
@app.post("/api/chat")
def chat(message: Message):
  # Predefined responses (can be extended later)
  responses = {
    "hello": "Hi there! How can I assist you?",
    "how are you?": "I'm just a bot, but I'm doing great!",
    "bye": "Goodbye! Have a great day!",
  }
  user_message = message.message.lower()
  response = responses.get(user_message, "Sorry, I didn't understand that.")
  return {"response": response}
