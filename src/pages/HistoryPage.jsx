import Header from "../components/Header";

const HistoryPage = () => {
  const conversations =
    JSON.parse(localStorage.getItem("past_conversations")) || [];

  return (
    <div>
      <Header />

      {conversations.length === 0 && (
        <p>No past conversations found.</p>
      )}

      {conversations.map((conv, index) => (
        <div key={conv.id}>
          <h3>Conversation {index + 1}</h3>

          {conv.messages.map((msg, idx) => (
            <p key={idx}>{msg.text}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
