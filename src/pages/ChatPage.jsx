import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import SuggestedPrompts from "../components/SuggestedPrompts";
import botResponses from "../data/botResponses.json";
import "../styles/ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  // Cypress expects "chatHistory"
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  const handleAsk = (question) => {
    if (!question.trim()) return;

    const key = question.toLowerCase();

    const reply =
      botResponses[key] ||
      "Sorry, Did not understand your query!";

    const updatedMessages = [
      ...messages,
      { role: "user", text: question },
      { role: "bot", text: reply }
    ];

    setMessages(updatedMessages);
    localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
  };

  const handleSave = () => {
    const existing =
      JSON.parse(localStorage.getItem("past_conversations")) || [];

    existing.push({
      id: Date.now(),
      messages
    });

    localStorage.setItem(
      "past_conversations",
      JSON.stringify(existing)
    );
  };

  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="chat-layout">
      <aside className="sidebar">
        {/* Cypress expects <a href="/"> */}
        <Link to="/" className="new-chat" onClick={handleNewChat}>
          New Chat
        </Link>

        {/* Cypress expects a[href="/history"] */}
        <Link to="/history" className="past-chat">
          Past Conversations
        </Link>
      </aside>

      <main className="chat-main">
        <Header />

        {messages.length === 0 ? (
          <SuggestedPrompts onSelect={handleAsk} />
        ) : (
          <MessageList messages={messages} />
        )}

        <ChatInput onAsk={handleAsk} onSave={handleSave} />
      </main>
    </div>
  );
};

export default ChatPage;
