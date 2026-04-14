import { Link } from "react-router-dom";
import { Home, Search, Sparkles, User, LogIn, PlusCircle } from "lucide-react";
import { motion } from "motion/react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200"
            >
              <Home size={24} />
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Nest AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/search" className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
              <Search size={18} />
              Tìm kiếm
            </Link>
            <Link to="/ai-recommend" className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
              <Sparkles size={18} className="text-amber-500" />
              Gợi ý AI
            </Link>
            <Link to="/add-room" className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
              <PlusCircle size={18} />
              Đăng tin
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium">
              <LogIn size={18} />
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              Tham gia
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
