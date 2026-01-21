import Header from "../components/Header";

const HistoryPage = () => {
  const conversations =
    JSON.parse(localStorage.getItem("past_conversations")) || [];

  return (
    <div>
      <Header />
      {conversations.map((conv) =>
        conv.messages.map((msg, idx) => (
          <p key={idx}>{msg.text}</p>
        ))
      )}
    </div>
  );
};

export default HistoryPage;
