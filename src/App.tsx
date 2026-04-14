import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { AiRecommend } from "./pages/AiRecommend";
import { RoomDetail } from "./pages/RoomDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { AddRoom } from "./pages/AddRoom";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/ai-recommend" element={<AiRecommend />} />
            <Route path="/room/:id" element={<RoomDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-room" element={<AddRoom />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
