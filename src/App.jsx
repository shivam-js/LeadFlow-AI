import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Track from "./pages/Track";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Analytics />} />
      <Route path="/track" element={<Track />} />
    </Routes>
  );
}