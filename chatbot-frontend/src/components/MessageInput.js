import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/outline";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="message-input p-2 flex items-center justify-between rounded-lg border m-4 sm:m-6">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="rounded p-2 resize-none h-16 max-h-48 overflow-auto w-full"
        placeholder="Type your message..."
        rows="2"
        style={{ resize: 'vertical' }}
      />
      <button
        onClick={() => sendMessage()}
        className="ml-2 bg-gray-500 text-white rounded-lg px-2.5 py-2 hover:bg-black transition duration-200"
      >
        <PaperAirplaneIcon className="h-5 w-5 rotate-90 text-white" />
      </button>
    </div>
  );
};

export default MessageInput;