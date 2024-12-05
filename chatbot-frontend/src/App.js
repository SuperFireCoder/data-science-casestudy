import { useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const newMessage = { sender: "User", text };
    setMessages([...messages, newMessage]);

    // Call the backend API to get the bot's response
    const response = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "Bot", text: data.response },
    ]);
  };

  return (
    <div className="App">
      <div className="chat-container max-w-lg mx-auto mt-4 border p-4 rounded-lg shadow-lg">
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
