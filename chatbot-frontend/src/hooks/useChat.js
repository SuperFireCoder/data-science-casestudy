import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const newMessage = { sender: "User", text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Bot", text: data.response },
        ]);
      } else {
        console.error("Error from server:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return [
    messages,
    sendMessage,
  ];
};

export default useChat;
