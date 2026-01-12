import { useEffect, useState } from "react";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import SuggestedPrompts from "../components/SuggestedPrompts";
import responses from "../data/botResponses.json";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = (text) => {
    const reply =
      responses[text] || "Sorry, I don’t have an answer for that question.";

    setMessages([
      ...messages,
      { sender: "user", text },
      { sender: "bot", text: reply }
    ]);
  };

  return (
    <main className="chat-container">
      {messages.length === 0 && <SuggestedPrompts />}
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </main>
  );
};

export default ChatPage;
