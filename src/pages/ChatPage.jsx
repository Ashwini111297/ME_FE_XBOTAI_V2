import { useEffect, useState } from "react";
import ChatInput from "../components/ChatInput";

const RESPONSES = {
  "Hi, what is the weather":
    "The weather is pleasant today with clear skies and mild temperatures.",
  "Hi, what is my location":
    "Your location is Bengaluru, Karnataka, IN.",
  "Hi, what is the temperature":
    "The current temperature is around 25°C (77°F).",
  "Hi, how are you":
    "I'm doing well, thank you for asking! How can I assist you today?"
};

export default function ChatPage() {
  const [messages, setMessages] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("conversations")) || [];
    setMessages(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(messages));
  }, [messages]);

  const handleAsk = (question) => {
    if (!question) return;

    const userMsg = { type: "user", text: question };
    const aiMsg = {
      type: "ai",
      text:
        RESPONSES[question] ||
        "Sorry, Did not understand your query!"
    };

    setMessages([...messages, userMsg, aiMsg]);
  };

  return (
    <div>
      {messages.map((m, i) => (
        <p key={i}>{m.text}</p>
      ))}

      <ChatInput onAsk={handleAsk} />
    </div>
  );
}
