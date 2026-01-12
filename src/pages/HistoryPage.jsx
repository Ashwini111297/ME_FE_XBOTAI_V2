import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem("chatHistory")) || []);
  }, []);

  return (
    <div className="chat-container">
      <h2>Past Conversations</h2>
      {messages.map((m, i) => (
        <p key={i}>
          <span>{m.text}</span>
        </p>
      ))}
    </div>
  );
};

export default HistoryPage;
