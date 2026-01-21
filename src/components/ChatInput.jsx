import { useState } from "react";
import "../styles/ChatInput.css";

const ChatInput = ({ onAsk, onSave }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAsk(input);
    setInput("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Message Bot AI..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit">Ask</button>

      {/* Cypress expects button[type="button"] */}
      <button type="button" onClick={onSave}>
        Save
      </button>
    </form>
  );
};

export default ChatInput;
