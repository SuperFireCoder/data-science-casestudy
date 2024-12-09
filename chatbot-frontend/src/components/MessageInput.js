import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/outline";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input p-2 flex items-center justify-between rounded-lg border m-4 sm:m-6">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-none rounded-lg p-3 flex-1 text-gray-800 focus:outline-none"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 bg-gray-500 text-white rounded-lg px-2.5 py-2 hover:bg-black transition duration-200"
      >
        <PaperAirplaneIcon className="h-5 w-5 rotate-90 text-white" />
      </button>
    </div>
  );
};

export default MessageInput;