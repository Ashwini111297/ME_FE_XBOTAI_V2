export default function FeedbackDashboard() {
  const conversations =
    JSON.parse(localStorage.getItem("conversations")) || [];

  return (
    <main>
      <h2>All Feedback</h2>
      {conversations.map((c) => (
        <div key={c.id}>
          ⭐ {c.rating} – {c.subjectiveFeedback}
        </div>
      ))}
    </main>
  );
}
