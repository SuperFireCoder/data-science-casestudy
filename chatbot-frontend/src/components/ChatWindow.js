const ChatWindow = ({ messages }) => (
  <div className="chat-window overflow-y-auto max-h-[70vh] p-4 rounded-lg m-4 sm:m-6 flex flex-col-reverse">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`message p-3 my-2 max-w-[80%] rounded-lg shadow-sm ${msg.sender === "User" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-gray-800 self-start"
          }`}
      >
        <strong className="text-sm font-semibold">{msg.sender}: </strong>
        <span>{msg.text}</span>
      </div>
    ))}
  </div>
);

export default ChatWindow;