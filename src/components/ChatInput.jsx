import { useState } from "react";
import "../styles/ChatInput.css";

const ChatInput = ({ onAsk, onSave }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAsk(value);
    setValue("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your question here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="chat-actions">
      
        <button type="button" onClick={onSave}>
          Save
        </button>

        
        <button type="submit">
          Ask
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
