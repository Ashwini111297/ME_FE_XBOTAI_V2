export default function Header({ setPage }) {
  return (
    <header>
      <h1>Bot AI</h1>

      <button onClick={() => setPage("chat")}>New Chat</button>
      <button onClick={() => setPage("history")}>Past Conversations</button>
    </header>
  );
}
