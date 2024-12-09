from typing import Dict

class ConversationState:
    def __init__(self):
        self.state = {
            "last_topic": None,
            "last_mood": 5,  # Scale from 0 to 10, where 5 is neutral
            "last_response": None,
        }

    def update(self, user_message: str):
        """ Update mood based on the message """
        if "how are you" in user_message:
            if "good" in user_message or "great" in user_message:
                self.state["last_mood"] = min(self.state["last_mood"] + 1, 10)  # Increment mood
            elif "bad" in user_message or "down" in user_message:
                self.state["last_mood"] = max(self.state["last_mood"] - 1, 0)  # Decrement mood
        elif "bye" in user_message or "goodbye" in user_message:
            self.state["last_topic"] = "goodbye"
    
    def get_state(self) -> Dict:
        """ Get the current state """
        return self.state