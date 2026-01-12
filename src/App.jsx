import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
