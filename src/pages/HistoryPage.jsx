import ConversationCard from "../components/ConversationalCard";

export default function HistoryPage() {
  const conversations =
    JSON.parse(localStorage.getItem("conversations")) || [];

  return (
    <main className="history-page">
      <h2>Past Conversations</h2>

      {conversations.length === 0 ? (
        <p>No conversations saved yet.</p>
      ) : (
        conversations.map((conv) => (
          <ConversationCard
            key={conv.id}
            conversation={conv}
          />
        ))
      )}
    </main>
  );
}
