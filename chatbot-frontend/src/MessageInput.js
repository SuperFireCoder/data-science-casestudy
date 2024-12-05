import { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input p-2 flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded p-2 flex-1"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 bg-blue-500 text-white rounded px-4 py-2"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;