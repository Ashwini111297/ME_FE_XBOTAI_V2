const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={msg.role === "user" ? "user-message" : "bot-message"}
        >
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
