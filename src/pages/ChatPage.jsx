import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import SuggestedPrompts from "../components/SuggestedPrompts";
import RatingModal from "../components/RatingModal";
import botResponses from "../data/botResponses.json";
import "../styles/ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  const handleAsk = (question) => {
    if (!question.trim()) return;

    const found = botResponses.find(
      (item) => item.question.toLowerCase() === question.toLowerCase()
    );

    const reply = found
      ? found.answer
      : "Sorry, I don’t have an answer for that question.";

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

    localStorage.setItem("past_conversations", JSON.stringify(existing));
  };

  const handleFeedback = (index) => {
    setSelectedIndex(index);
    setShowRating(true);
  };

  const handleSubmitFeedback = (data) => {
    console.log("Feedback submitted:", data);

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
        <button className="new-chat" onClick={() => {
          setMessages([]);
          localStorage.removeItem("chat_history");
        }}>
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
