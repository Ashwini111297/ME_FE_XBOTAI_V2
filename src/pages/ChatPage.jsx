// force redeploy change

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import SuggestedPrompts from "../components/SuggestedPrompts";
import RatingModal from "../components/RatingModal";

import botResponses from "../data/botResponses.json";
import { sampleResponses } from "../data/sampleData"; 

import "../styles/ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const navigate = useNavigate();

  // Load current chat on refresh
  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  const handleAsk = (question) => {
    if (!question.trim()) return;

    const normalizedQuestion = question.toLowerCase().trim();

    // 1️⃣ First priority: sampleResponses
    let reply = sampleResponses[normalizedQuestion];

    // 2️⃣ Second priority: botResponses.json
    if (!reply) {
      const found = botResponses.find(
        (item) => item.question.toLowerCase() === normalizedQuestion
      );

      reply = found
        ? found.answer
        : "Sorry, I don’t have an answer for that question.";
    }

    const updatedMessages = [
      ...messages,
      { role: "user", text: question },
      { role: "bot", text: reply }
    ];

    setMessages(updatedMessages);
    localStorage.setItem("chat_history", JSON.stringify(updatedMessages));
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

  const handleFeedback = (index) => {
    setSelectedIndex(index);
    setShowRating(true);
  };

  const handleSubmitFeedback = (data) => {
    const existing =
      JSON.parse(localStorage.getItem("feedback")) || [];

    existing.push({
      messageIndex: selectedIndex,
      ...data
    });

    localStorage.setItem("feedback", JSON.stringify(existing));
    setShowRating(false);
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
          <MessageList
            messages={messages}
            onFeedback={handleFeedback}
          />
        )}

        <ChatInput onAsk={handleAsk} onSave={handleSave} />
      </main>

      {showRating && (
        <RatingModal
          onClose={() => setShowRating(false)}
          onSubmit={handleSubmitFeedback}
        />
      )}
    </div>
  );
};

export default ChatPage;
