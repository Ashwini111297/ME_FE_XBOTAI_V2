const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, idx) => (
        <p key={idx}>{msg.text}</p>
      ))}
    </div>
  );
};

export default MessageList;
