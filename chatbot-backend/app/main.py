import time
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
  try:
      time.sleep(0.1)
      logger.info("Health check successful")
      return {"status": "OK"}
  except Exception as e:
      logger.error(f"Health check failed: {e}")
      raise HTTPException(status_code=500, detail="Health check failed")

@app.post("/api/chat")
def chat(message: Message):
  start_time = time.time()
  try:
    logger.info(f"Received message: {message.message}")
    responses = {
      "hello": "Hi there! How can I assist you?",
      "how are you?": "I'm just a bot, but I'm doing great!",
      "bye": "Goodbye! Have a great day!",
    }
    user_message = message.message.lower()
    response = responses.get(user_message, "Sorry, I didn't understand that.")
    response_time = time.time() - start_time
    logger.info(f"Response sent: {response} (Time: {response_time:.2f}s)")
    return {"response": response}
  except Exception as e:
    logger.error(f"Error in processing message: {e}")
    raise HTTPException(status_code=500, detail="Error processing message")
