import { useState } from "react";
import Header from "./components/Header";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import FeedbackPage from "./pages/FeedbackPage";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("chat");

  return (
    <div>
      <Header setPage={setPage} />

      {page === "chat" && <ChatPage />}
      {page === "history" && <HistoryPage />}
      {page === "feedback" && <FeedbackPage />}
    </div>
  );
}
