import { useState } from "react";
import "../styles/ChatInput.css";

const ChatInput = ({ onAsk, onSave }) => {
  const [value, setValue] = useState("");

  const handleAsk = () => {
    if (!value.trim()) return;
    onAsk(value);
    setValue("");
  };

  return (
    <div className="chat-input-container">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleAsk}>Ask</button>
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default ChatInput;
