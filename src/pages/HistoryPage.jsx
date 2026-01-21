import { useEffect, useState } from "react";
import "../styles/HistoryPage.css";

const HistoryPage = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("past_conversations")) || [];
    setConversations(data);
  }, []);

  return (
    <div className="history-page">
      <h2>Past Conversations</h2>

      {conversations.length === 0 && <p>No conversations yet.</p>}

      {conversations.map((c) => (
        <div key={c.id} className="history-card">
          {c.messages.map((m, i) => (
            <p key={i}>
              <strong>{m.role}:</strong> {m.text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
