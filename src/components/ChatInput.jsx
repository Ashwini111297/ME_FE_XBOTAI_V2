import { useState } from "react";

export default function ChatInput({ onAsk }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAsk(value);
    setValue("");
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Message Bot AI..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Ask</button>
    </form>
  );
}
