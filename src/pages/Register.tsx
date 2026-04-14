import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Home, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export function Register() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 overflow-hidden flex flex-col md:flex-row border border-slate-100"
      >
        <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-white/10 skew-x-12 translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
              <Home size={24} />
            </div>
            <h2 className="text-4xl font-bold mb-6">Bắt đầu hành trình mới</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Nest AI đồng hành cùng bạn trong việc tìm kiếm không gian sống lý tưởng nhất tại Cao Lãnh.
            </p>
          </div>
          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-blue-200" size={20} />
              <span className="text-sm font-medium">Thông tin được bảo mật</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-200" size={20} />
              <span className="text-sm font-medium">Hỗ trợ sinh viên 24/7</span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Tạo tài khoản</h1>
          
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setRole("student")}
              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all text-sm ${
                role === "student" ? "bg-blue-50 border-blue-600 text-blue-600" : "bg-white border-slate-100 text-slate-400"
              }`}
            >
              Sinh viên
            </button>
            <button 
              onClick={() => setRole("landlord")}
              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all text-sm ${
                role === "landlord" ? "bg-blue-50 border-blue-600 text-blue-600" : "bg-white border-slate-100 text-slate-400"
              }`}
            >
              Chủ trọ
            </button>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 mt-4"
            >
              Đăng ký
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
