import { useEffect, useContext } from "react";
import { ChatContext } from './context/ChatContext';
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { RefreshIcon } from "@heroicons/react/outline";

function App() {
  const { messages, isHealthy, sendMessage, retry, clearHistory } = useContext(ChatContext);

  useEffect(() => {
    const alertShown = localStorage.getItem('alertShown');

    if (!alertShown) {
      alert('To submit your message, press Enter (Ctrl + Enter) or click the submit button.');
      localStorage.setItem('alertShown', 'true');
    }
  }, []);

  return (
    <div className="App min-h-screen flex items-center justify-center bg-gray-100">
      <div className="chat-container w-full max-w-3xl bg-white border rounded-lg shadow-lg overflow-hidden mx-4">
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={sendMessage} />
        <div className="flex justify-between m-6">
          <div className="flex items-center">
            {isHealthy === null ? (
              <p className="text-yellow-500">Checking server health...</p>
            ) : isHealthy === false ? (
              <p className="text-red-500">Server is not working</p>
            ) : (
              <p className="text-green-500">Server is healthy</p>
            )}
            <button
              onClick={retry}
              className="ml-2 bg-gray-500 text-white rounded-lg px-2.5 py-2 hover:bg-black transition duration-200"
            >
              <RefreshIcon className="h-5 w-5 rotate-90 text-white" />
            </button>
          </div>
          <button
            onClick={clearHistory}
            className=" bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
