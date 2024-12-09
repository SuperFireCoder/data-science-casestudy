from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
  response = client.get("/api/health")
  assert response.status_code == 200
  assert response.json() == {"status": "OK"}

def test_chat_with_known_message():
  response = client.post("/api/chat", json={"message": "hello"})
  assert response.status_code == 200
  assert response.json() == {"response": "Hi there! How can I assist you?"}

def test_chat_with_unknown_message():
  response = client.post("/api/chat", json={"message": "unknown"})
  assert response.status_code == 200
  assert response.json() == {"response": "Sorry, I didn't understand that."}
