from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.logic import generate_response, update_conversation_state
from app.state import conversation_state
from app.models import Message
import time
import logging

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
        
        user_message = message.message.lower()

        update_conversation_state(user_message)
        
        response = generate_response(user_message)

        conversation_state["last_response"] = response

        response_time = time.time() - start_time
        logger.info(f"Response sent: {response} (Time: {response_time:.2f}s)")

        return {"response": response}

    except Exception as e:
        logger.error(f"Error in processing message: {e}")
        raise HTTPException(status_code=500, detail="Error processing message")
