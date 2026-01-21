import "../styles/SuggestedPrompts.css";

const SuggestedPrompts = ({ onSelect }) => {
  const prompts = [
    "Hi, what is the weather",
    "Hi, what is my location",
    "Hi, what is the temperature",
    "Hi, how are you"
  ];

  return (
    <div className="suggestions-container">
      <h2 className="suggestions-title">How Can I Help You Today?</h2>

      <div className="cards">
        {prompts.map((p, i) => (
          <div
            key={i}
            className="card"
            onClick={() => onSelect(p)}
          >
            <strong>{p}</strong>
            <p>Get immediate AI generated response</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
