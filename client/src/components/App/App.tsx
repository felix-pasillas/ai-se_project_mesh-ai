import { Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "../AppLayout/AppLayout";
import Intro from "../../pages/Intro/Intro";
import KnowledgeBase from "../../pages/KnowledgeBase/KnowledgeBase";
import Chat from "../../pages/Chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route element={<AppLayout />}>
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
