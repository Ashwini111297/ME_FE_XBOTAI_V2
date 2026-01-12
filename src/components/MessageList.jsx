import "../styles/MessageList.css";

export default function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.type === "user" ? "user" : "ai"}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
