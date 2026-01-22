import "../styles/MessageList.css";

const MessageList = ({ messages, onFeedback }) => {
  return (
    <div className="message-list">
      {messages.map((msg, idx) => (
        <div key={idx} className={`message-row ${msg.role}`}>
          <span>{msg.sender}</span>

          <div className="message-bubble">
            <p>{msg.text}</p>

            {msg.role === "bot" && (
              <div className="feedback">
                <button onClick={() => onFeedback(idx)}>👍</button>
                <button onClick={() => onFeedback(idx)}>👎</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
