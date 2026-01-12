export default function HistoryPage() {
  const conversations =
    JSON.parse(localStorage.getItem("conversations")) || [];

  return (
    <div>
      <h2>Past Conversations</h2>

      {conversations.map((msg, i) => (
        <p key={i}>{msg.text}</p>
      ))}
    </div>
  );
}
