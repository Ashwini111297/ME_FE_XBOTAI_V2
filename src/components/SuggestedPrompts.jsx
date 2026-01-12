import "../styles/SuggestedPrompts.css";

const prompts = [
  "Hi, what is the weather",
  "Hi, what is my location",
  "Hi, what is the temperature",
  "Hi, how are you"
];

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="prompts">
      <h2>How Can I Help You Today?</h2>

      <div className="prompt-grid">
        {prompts.map((p) => (
          <button key={p} onClick={() => onSelect(p)} className="prompt-card">
            <p>{p}</p>
            <span>Get immediate AI generated response</span>
          </button>
        ))}
      </div>
    </div>
  );
}
