import Header from "../components/Header";

const HistoryPage = () => {
  const conversations =
    JSON.parse(localStorage.getItem("past_conversations")) || [];

  return (
    <div>
      <Header />
      <h2>Past Conversations</h2>

      {conversations.map((conv) => (
        <div key={conv.id}>
          {conv.messages.map((msg, idx) => (
            <p key={idx}>{msg.text}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
