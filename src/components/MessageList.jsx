import "../styles/MessageList.css";
import userAvatar from "../assets/user.png";
import botAvatar from "../assets/bot.png";

const MessageList = ({ messages, onFeedback }) => {
  return (
    <div className="message-list">
      {messages.map((msg, idx) => (
        <div key={idx} className={`message-row ${msg.role}`}>
          <img
            src={msg.role === "user" ? userAvatar : botAvatar}
            alt={msg.role}
            className="avatar"
          />

          <div className="message-bubble">
            <p>{msg.text}</p>

            <span className="timestamp">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>

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
