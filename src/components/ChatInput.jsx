import { useState } from "react";

export default function ChatInput({ onSend, onSave }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="chat-input" onSubmit={submit}>
      <input
        placeholder="Message Bot AI…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Ask</button>
      <button type="button" onClick={onSave}>
        Save
      </button>
    </form>
  );
}
