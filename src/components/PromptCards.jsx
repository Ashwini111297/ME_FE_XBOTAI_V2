const prompts = [
  "Hi, what is the weather",
  "Hi, what is my location",
  "Hi, what is the temperature",
  "Hi, how are you"
];

export default function PromptCards({ onSelect }) {
  return (
    <div className="prompt-grid">
      {prompts.map((p) => (
        <div key={p} className="prompt-card" onClick={() => onSelect(p)}>
          <strong>{p}</strong>
          <p>Get immediate AI generated response</p>
        </div>
      ))}
    </div>
  );
}
