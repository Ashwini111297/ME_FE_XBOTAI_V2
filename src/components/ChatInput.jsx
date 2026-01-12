import { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <form className="chat-input" onSubmit={submit}>
      <input
        placeholder="Message Bot AI..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Ask</button>
      <button type="button">Save</button>
    </form>
  );
};

export default ChatInput;
