import { useNavigate } from "react-router-dom";
import botIcon from "../assets/bot.png";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="logo">
        <span>Soul AI</span>
      </div>

      <button className="new-chat-btn" onClick={() => navigate("/")}>
        <img src={botIcon} alt="Bot" className="sidebar-bot-icon" />
        <span>New Chat</span>
      </button>

      <button
        className="past-btn"
        onClick={() => navigate("/history")}
      >
        Past Conversations
      </button>
    </aside>
  );
}
