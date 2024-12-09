import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import useChat from "./hooks/useChat";

function App() {
  const { messages, isHealthy, sendMessage } = useChat();

  return (
    <div className="App min-h-screen flex items-center justify-center bg-gray-100">
      <div className="chat-container w-full max-w-3xl mt-8 bg-white border rounded-lg shadow-lg overflow-hidden mx-4">
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={sendMessage} />
        <div className="flex mb-2 justify-center">
          {isHealthy === null ? (
            <p className="text-yellow-500">Checking server health...</p>
          ) : isHealthy === false ? (
            <p className="text-red-500">Server is not working</p>
          ) : (
            <p className="text-green-500">Server is healthy</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
