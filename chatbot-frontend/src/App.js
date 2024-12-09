import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import useChat from "./hooks/useChat";

function App() {
  const [messages, sendMessage] = useChat();

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
