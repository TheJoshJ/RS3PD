import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Player from "./pages/player/Player";
import QuestList from "./pages/questList/QuestList";
import Quest from "./pages/quest/Quest";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/player" element={<Player />} />
      <Route path="/player/:username" element={<Player />} />
      <Route path="/quests" element={<QuestList />} />
      <Route path="/quests/:username" element={<QuestList />} />
      <Route path="/quest/:quest" element={<Quest />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
