import HoverFeedback from "./HoverFeedback";

export default function ChatMessage({ message, onFeedback }) {
  if (message.role === "user") {
    return (
      <div className="message user">
        <strong>You</strong>
        <p>{message.content}</p>
      </div>
    );
  }

  return (
    <div className="message ai">
      <span>Soul AI</span>
      <p>{message.content}</p>
      <HoverFeedback onSelect={onFeedback} />
    </div>
  );
}
