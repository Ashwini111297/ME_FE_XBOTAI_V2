// force redeploy change

import { useEffect, useState } from "react";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import SuggestedPrompts from "../components/SuggestedPrompts";
import RatingModal from "../components/RatingModal";

import botResponses from "../data/botResponses.json";
import "../styles/ChatPage.css";

// NORMALIZE FUNCTION (REQUIRED)
const normalize = (text) =>
  text.toLowerCase().replace(/[?!.]/g, "").trim();

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [conversationId] = useState(Date.now());

  // Load chat on refresh
  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save to past conversations
  useEffect(() => {
    if (messages.length === 0) return;

    const existing =
      JSON.parse(localStorage.getItem("past_conversations")) || [];

    const updated = [...existing];
    const index = updated.findIndex(
      (conv) => conv.id === conversationId
    );

    if (index !== -1) {
      updated[index].messages = messages;
    } else {
      updated.push({
        id: conversationId,
        messages,
      });
    }

    localStorage.setItem(
      "past_conversations",
      JSON.stringify(updated)
    );
  }, [messages, conversationId]);

  // MAIN LOGIC (MATCHES CYPRESS)
  const handleAsk = (question) => {
    if (!question.trim()) return;

    const normalizedQuestion = normalize(question);

    const found = botResponses.find(
      (item) => normalize(item.question) === normalizedQuestion
    );

    const reply = found
      ? found.answer
      : "Sorry, Did not understand your query!";

    const updated = [
      ...messages,
      { role: "user", sender: "You", text: question },
      { role: "bot", sender: "Soul AI", text: reply },
    ];

    setMessages(updated);
    localStorage.setItem("chat_history", JSON.stringify(updated));
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
      ...data,
    });

    localStorage.setItem("feedback", JSON.stringify(existing));
    setShowRating(false);
  };

  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <a href="/" className="new-chat" onClick={handleNewChat}>
          New Chat
        </a>

        <a href="/history" className="past-chat">
          Past Conversations
        </a>
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

        <ChatInput onAsk={handleAsk} />
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
