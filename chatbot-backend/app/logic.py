import random
import re
from app.responses import responses
from app.state import ConversationState

conversation_state = ConversationState()

def update_conversation_state(user_message: str):
    """
    Updates the conversation state based on the user's message.
    """
    conversation_state.update(user_message)

def generate_response(user_message: str) -> str:
    """
    Generates a response based on the user's message and conversation state.
    """
    state = conversation_state.get_state()

    # 1. Respond based on mood and context:
    if "how are you" in user_message:
        if state["last_mood"] >= 8:
            return random.choices([r[0] for r in responses["how are you"]], [r[1] for r in responses["how are you"]])[0]
        elif state["last_mood"] <= 3:
            return random.choices([r[0] for r in responses["how are you"]], [r[1] for r in responses["how are you"]])[0]

    # 2. Check for predefined responses:
    if user_message in responses:
        return random.choices([r[0] for r in responses[user_message]], [r[1] for r in responses[user_message]])[0]

    # 3. Check for greetings and return responses:
    if re.search(r"(hi|hello|hey)", user_message):
        return random.choices([r[0] for r in responses["hello"]], [r[1] for r in responses["hello"]])[0]
    elif re.search(r"(how.*you)", user_message):
        return random.choices([r[0] for r in responses["how are you"]], [r[1] for r in responses["how are you"]])[0]
    elif re.search(r"(bye|goodbye)", user_message):
        return random.choices([r[0] for r in responses["bye"]], [r[1] for r in responses["bye"]])[0]

    # 4. Fallback response:
    return random.choices([r[0] for r in responses["default"]], [r[1] for r in responses["default"]])[0]