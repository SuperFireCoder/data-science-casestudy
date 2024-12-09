from app.logic import generate_response, update_conversation_state
from app.state import conversation_state

def test_generate_response_hello():
    """
    Test the generate_response function with a 'hello' message.
    """
    response = generate_response("hello")
    assert response in ["Hi there! How can I assist you?", "Hello! How can I help today?"]

def test_generate_response_how_are_you():
    """
    Test the generate_response function with a 'how are you' message.
    """
    response = generate_response("how are you")
    assert response in ["I'm just a bot, but I'm doing great!", "I'm functioning perfectly!"]

def test_generate_response_unknown_message():
    """
    Test the generate_response function with an unknown message.
    """
    response = generate_response("unknown message")
    assert response in ["Sorry, I didn't understand that.", "Can you rephrase that?", "I'm not sure how to respond to that."]

def test_update_conversation_state_positive_mood():
    """
    Test the update_conversation_state function with a positive mood.
    """
    update_conversation_state("how are you, I'm feeling great")
    assert conversation_state["last_mood"] == "positive"

def test_update_conversation_state_negative_mood():
    """
    Test the update_conversation_state function with a negative mood.
    """
    update_conversation_state("how are you, I'm feeling bad")
    assert conversation_state["last_mood"] == "negative"

def test_update_conversation_state_goodbye():
    """
    Test the update_conversation_state function when a user says goodbye.
    """
    update_conversation_state("bye")
    assert conversation_state["last_topic"] == "goodbye"
