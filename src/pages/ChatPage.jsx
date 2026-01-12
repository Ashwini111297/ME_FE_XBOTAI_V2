// src/pages/ChatPage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import botResponses from "../data/botResponses.json";
import "../styles/ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (question) => {
    const normalizedQuestion = question.toLowerCase().trim();

    const answer =
      botResponses[normalizedQuestion] ||
      "Sorry, Did not understand your query!";

    const newMessages = [
      ...messages,
      { sender: "user", text: question },
      { sender: "bot", text: answer }
    ];

    setMessages(newMessages);
    localStorage.setItem("messages", JSON.stringify(newMessages));
  };

  return (
    <>
      <Header />
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </>
  );
};

export default ChatPage;
