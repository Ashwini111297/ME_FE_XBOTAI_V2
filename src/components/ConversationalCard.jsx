export default function ConversationalCard({ conversation }) {
  return (
    <div className="conversation-card">
      <p>
        <strong>Rating:</strong> {conversation.rating}
      </p>

      <p>
        <strong>Feedback:</strong>{" "}
        {conversation.subjectiveFeedback}
      </p>

      <div className="messages-preview">
        {conversation.messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
}
