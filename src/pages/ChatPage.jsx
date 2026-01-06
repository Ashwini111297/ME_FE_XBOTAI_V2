import { useState } from "react";
import PromptCards from "../components/PromptCards";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import { sampleResponses } from "../data/sampleData";
import logo from "../assets/bot.png"; 

export default function ChatPage() {
  const [messages, setMessages] = useState([]);

  const getAIResponse = (question) => {
    return (
      sampleResponses[question.toLowerCase()] ||
      "Sorry, Did not understand your query!"
    );
  };

  const handleSend = (text) => {
    const aiReply = getAIResponse(text);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "ai", content: aiReply, thumbs: null }
    ]);
  };

  const handleSave = () => {
    const rating = window.prompt("Rate conversation (1-5)");
    const feedback = window.prompt("Your feedback");

    const conversations =
      JSON.parse(localStorage.getItem("conversations")) || [];

    conversations.push({
      id: Date.now(),
      messages,
      rating,
      subjectiveFeedback: feedback
    });

    localStorage.setItem("conversations", JSON.stringify(conversations));
    setMessages([]);
  };

  return (
    <main className="chat-page">
      {messages.length === 0 ? (
        <div className="empty-state">
  <div className="empty-content">
    <h1 className="empty-title">How Can I Help You Today?</h1>

    <img src={logo} alt="Soul AI" className="soul-ai-image" />

    <PromptCards onSelect={handleSend} />
  </div>
</div>

      ) : (
        <ChatWindow messages={messages} setMessages={setMessages} />
      )}

      <ChatInput onSend={handleSend} onSave={handleSave} />
    </main>
  );
}
