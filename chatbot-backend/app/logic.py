import random
import re
from app.responses import responses
from app.state import conversation_state

def update_conversation_state(user_message: str):
    """
    Updates the conversation state based on the user's message.
    """
    global conversation_state
    if "how are you" in user_message:
        if "good" in user_message or "great" in user_message:
            conversation_state["last_mood"] = "positive"
        else:
            conversation_state["last_mood"] = "negative"
    elif "bye" in user_message or "goodbye" in user_message:
        conversation_state["last_topic"] = "goodbye"


def generate_response(user_message: str) -> str:
    """
    Generates a response based on the user's message and conversation state.
    """
    global conversation_state
    
    if conversation_state["last_mood"] == "positive" and "how are you" in user_message:
        return "I'm still doing great, thanks for asking!"
    elif conversation_state["last_mood"] == "negative" and "how are you" in user_message:
        return "I'm getting better, but still a bit down."
    
    if user_message in responses:
        return random.choice(responses[user_message])

    if re.search(r"(hi|hello|hey)", user_message):
        return random.choice(responses["hello"])
    elif re.search(r"(how.*you)", user_message):
        return random.choice(responses["how are you"])
    elif re.search(r"(bye|goodbye)", user_message):
        return random.choice(responses["bye"])

    return random.choice(responses["default"])
