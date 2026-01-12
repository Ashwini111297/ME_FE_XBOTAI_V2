// src/components/MessageList.jsx
import React from "react";
import "../styles/MessageList.css";

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <p key={index} className={msg.sender}>
          {msg.text}
        </p>
      ))}
    </div>
  );
};

export default MessageList;
