import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages, setMessages }) {
  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <ChatMessage
          key={idx}
          message={msg}
          onFeedback={(type) => {
            const copy = [...messages];
            copy[idx].thumbs = type;
            setMessages(copy);
          }}
        />
      ))}
    </div>
  );
}
