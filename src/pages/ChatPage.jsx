import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import SuggestedPrompts from "../components/SuggestedPrompts";
import botResponses from "../data/botResponses.json";
import "../styles/ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  const handleAsk = (question) => {
    if (!question.trim()) return;

    const key = question.toLowerCase();

    const reply =
      botResponses[key] ||
      "Sorry, I don’t have an answer for that question.";

    const updated = [
      ...messages,
      { role: "user", text: question },
      { role: "bot", text: reply }
    ];

    setMessages(updated);
    localStorage.setItem("chat_history", JSON.stringify(updated));
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
    localStorage.removeItem("chat_history");
  };

  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <button className="new-chat" onClick={handleNewChat}>
          New Chat
        </button>

        <button
          className="past-chat"
          onClick={() => navigate("/history")}
        >
          Past Conversations
        </button>
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
