// src/components/SuggestedPrompts.jsx
import logo from "../assets/bot.png";

const SuggestedPrompts = () => {
  const prompts = [
    "Hi, what is the weather",
    "Hi, what is my location",
    "Hi, what is the temperature",
    "Hi, how are you"
  ];

  return (
    <div className="suggestions">
      <h2>How Can I Help You Today?</h2>

      {/* LOGO BELOW TEXT */}
      <img src={logo} alt="Bot AI Logo" className="bot-logo" />

      <div className="cards">
        {prompts.map((p, i) => (
          <div key={i} className="card">
            <strong>{p}</strong>
            <p>Get immediate AI generated response</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
