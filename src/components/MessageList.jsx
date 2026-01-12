const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, i) => (
        <p key={i}>
          <span>{msg.text}</span>
        </p>
      ))}
    </div>
  );
};

export default MessageList;
