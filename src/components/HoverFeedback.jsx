export default function HoverFeedback({ onSelect }) {
  return (
    <div className="hover-feedback">
      <button onClick={() => onSelect("like")}>👍</button>
      <button onClick={() => onSelect("dislike")}>👎</button>
    </div>
  );
}
