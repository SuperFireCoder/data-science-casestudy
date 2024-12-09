import React, { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isHealthy, setIsHealthy] = useState(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const checkHealth = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/health');
        if (res.ok) {
          setIsHealthy(true);
        } else {
          setIsHealthy(false);
        }
      } catch {
        setIsHealthy(false);
      }
    };

    checkHealth();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const newMessage = { sender: 'User', text };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);

    if (!isHealthy) {
      const botMessage = { sender: 'Bot', text: 'Server is not working. Please try again later.' };
      setMessages((prevMessages) => [botMessage, ...prevMessages]);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [
          { sender: 'Bot', text: data.response },
          ...prevMessages,
        ]);
      } else {
        console.error('Error from server:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const retry = async () => {
    setIsHealthy(null);
    const res = await fetch('http://localhost:8000/api/health');
    if (res.ok) {
      setIsHealthy(true);
    } else {
      setIsHealthy(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <ChatContext.Provider value={{ messages, isHealthy, sendMessage, retry, clearHistory }}>
      {children}
    </ChatContext.Provider>
  );
};
