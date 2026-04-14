import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Home, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 p-8 md:p-12 border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-200">
            <Home size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Chào mừng trở lại</h1>
          <p className="text-slate-500">Đăng nhập để tiếp tục với Nest AI</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            <div className="text-right mt-2">
              <a href="#" className="text-sm font-bold text-blue-600 hover:underline">Quên mật khẩu?</a>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Đăng nhập"}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">Đăng ký ngay</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
