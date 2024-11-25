import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Player from "./pages/player/Player";
import QuestList from "./pages/questList/QuestList";
import Quest from "./pages/quest/Quest";
import Home from "./pages/home/Home";
import Navbar from "./layout/Navbar";
import NotFound from "./pages/notFound/NotFound";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/player", element: <Player /> },
  { path: "/player/:username", element: <Player /> },
  { path: "/quests", element: <QuestList /> },
  { path: "/quests/:username", element: <QuestList /> },
  { path: "/quest/:quest", element: <Quest /> },
  { path: "/404", element: <NotFound /> },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={"public-" + index}
            path={route.path}
            element={[<Navbar key={"navbar-" + index} />, route.element]}
          />
        ))}

        {/* Fallback Route (404 Not Found) */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
