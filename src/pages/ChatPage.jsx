// force redeploy change

import { useEffect, useState } from "react";
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

  // unique id for one chat session
  const [conversationId] = useState(Date.now());

  // Load current chat on refresh
  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // AUTO-SAVE TO PAST CONVERSATIONS
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

  const handleAsk = (question) => {
    if (!question.trim()) return;

    const normalizedQuestion = question.toLowerCase().trim();

    let reply = sampleResponses[normalizedQuestion];

    if (!reply) {
      const found = botResponses.find(
        (item) => item.question.toLowerCase() === normalizedQuestion
      );

      reply = found
        ? found.answer
        : "Sorry, I don’t have an answer for that question.";
    }

    const updated = [
      ...messages,
      { role: "user", text: question },
      { role: "bot", text: reply },
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
