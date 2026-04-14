import { useState, useEffect } from "react";
import { User, Heart, Home, Settings, LogOut, PlusCircle, Trash2, Edit } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RoomCard } from "../components/RoomCard";

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [myRooms, setMyRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    const fetchMyRooms = async () => {
      try {
        const res = await axios.get("/api/rooms");
        setMyRooms(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyRooms();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-24">
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-blue-100 rounded-[2rem] flex items-center justify-center text-blue-600 font-bold text-3xl mx-auto mb-4">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500 text-sm">{user.role === "student" ? "Sinh viên" : "Chủ trọ"}</p>
            </div>

            <nav className="space-y-2">
              {[
                { id: "overview", label: "Tổng quan", icon: <Home size={20} /> },
                { id: "saved", label: "Phòng đã lưu", icon: <Heart size={20} /> },
                { id: "my-rooms", label: user.role === "landlord" ? "Phòng của tôi" : "Lịch sử tìm kiếm", icon: <PlusCircle size={20} /> },
                { id: "settings", label: "Cài đặt", icon: <Settings size={20} /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                    activeTab === item.id 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all mt-8"
              >
                <LogOut size={20} />
                Đăng xuất
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Chào {user.name.split(" ").pop()}!</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-100">
                    <Heart className="mb-4 opacity-80" size={32} />
                    <span className="block text-4xl font-bold mb-1">12</span>
                    <span className="text-blue-100 font-medium">Phòng đã lưu</span>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <Home className="mb-4 text-indigo-600" size={32} />
                    <span className="block text-4xl font-bold mb-1">5</span>
                    <span className="text-slate-500 font-medium">Lượt xem gần đây</span>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <User className="mb-4 text-amber-600" size={32} />
                    <span className="block text-4xl font-bold mb-1">2</span>
                    <span className="text-slate-500 font-medium">Chủ trọ đã liên hệ</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-6">Gợi ý mới nhất cho bạn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {myRooms.slice(0, 2).map(room => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "my-rooms" && (
              <motion.div
                key="my-rooms"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-slate-900">Quản lý bài đăng</h1>
                  <button 
                    onClick={() => navigate("/add-room")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    <PlusCircle size={20} />
                    Đăng tin mới
                  </button>
                </div>

                <div className="space-y-6">
                  {myRooms.map(room => (
                    <div key={room.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                      <img 
                        src={room.image} 
                        alt={room.title} 
                        className="w-full md:w-48 h-32 object-cover rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg text-slate-800 mb-1">{room.title}</h3>
                        <p className="text-slate-500 text-sm mb-4">{room.address}</p>
                        <div className="flex gap-4">
                          <span className="text-blue-600 font-bold">{room.price.toLocaleString("vi-VN")}đ/tháng</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">{room.distance}km đến trường</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
                          <Edit size={20} />
                        </button>
                        <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { AnimatePresence } from "motion/react";
