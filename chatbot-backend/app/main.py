from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.get("/api/health")
def health_check():
  return {"status": "OK"}

@app.post("/api/chat")
def chat(message: Message):
  responses = {
    "greetings": ["Hi there!", "Hello! How can I assist you today?", "Good morning!", "Hey! How's it going?"],
    "bye": ["Goodbye! Have a great day!", "See you soon!", "Take care!"],
    "joke": ["Why don't skeletons fight each other? They don't have the guts.", "What do you call fake spaghetti? An impasta."]
  }
  user_message = message.message.lower()
  if "hello" in user_message or "hi" in user_message:
      response = random.choice(responses["greetings"])
  elif "bye" in user_message:
      response = random.choice(responses["bye"])
  elif "joke" in user_message:
      response = random.choice(responses["joke"])
  else:
      response = "Sorry, I didn't understand that."
  return {"response": response}
