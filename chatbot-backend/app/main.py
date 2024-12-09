from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
    "hello": "Hi there! How can I assist you?",
    "how are you?": "I'm just a bot, but I'm doing great!",
    "bye": "Goodbye! Have a great day!",
  }
  user_message = message.message.lower()
  response = responses.get(user_message, "Sorry, I didn't understand that.")
  return {"response": response}
