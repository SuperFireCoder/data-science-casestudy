import { useState } from "react";
import useHealthCheck from "./useHealthCheck";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const { isHealthy, retry } = useHealthCheck();

  const sendMessage = async (text) => {
    const newMessage = { sender: "User", text };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);

    if (!isHealthy) {
      const botMessage = { sender: "Bot", text: "Server is not working. Please try again later." };
      setMessages((prevMessages) => [botMessage, ...prevMessages]);
      return;
    }

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
          { sender: "Bot", text: data.response },
          ...prevMessages,
        ]);
      } else {
        console.error("Error from server:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    messages,
    isHealthy,
    sendMessage,
    retry,
  };
};

export default useChat;
