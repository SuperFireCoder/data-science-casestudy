const ChatWindow = ({ messages }) => (
  <div className="chat-window overflow-y-auto max-h-[400px] p-4 border-b">
    {messages.map((msg, index) => (
      <div key={index} className="message p-2">
        <strong>{msg.sender}: </strong>{msg.text}
      </div>
    ))}
  </div>
);

export default ChatWindow;