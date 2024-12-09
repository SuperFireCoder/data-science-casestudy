from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    """
    Test the health check endpoint.
    """
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "OK"}

def test_chat_hello():
    """
    Test the /api/chat endpoint with a 'hello' message.
    """
    response = client.post("/api/chat", json={"message": "hello"})
    assert response.status_code == 200
    response_data = response.json()
    assert "response" in response_data
    assert response_data["response"] in ["Hi there! How can I assist you?", "Hello! How can I help today?"]

def test_chat_unknown_message():
    """
    Test the /api/chat endpoint with an unknown message.
    """
    response = client.post("/api/chat", json={"message": "unknown message"})
    assert response.status_code == 200
    response_data = response.json()
    assert "response" in response_data
    assert response_data["response"] in ["Sorry, I didn't understand that.", "Can you rephrase that?", "I'm not sure how to respond to that."]

def test_chat_bye():
    """
    Test the /api/chat endpoint with a 'bye' message.
    """
    response = client.post("/api/chat", json={"message": "bye"})
    assert response.status_code == 200
    response_data = response.json()
    assert "response" in response_data
    assert response_data["response"] in ["Goodbye! Have a great day!", "See you later! Take care!"]
