import "../styles/MessageList.css";

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((m, i) => (
        <div key={i} className={`message ${m.role}`}>
          {m.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
