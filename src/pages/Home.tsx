import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Sparkles, ArrowRight, MapPin, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { RoomCard } from "../components/RoomCard";
import axios from "axios";

export function Home() {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("/api/rooms");
        setFeaturedRooms(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
              Dành riêng cho sinh viên DTHU
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight">
              Tìm phòng trọ <span className="text-blue-600">lý tưởng</span> <br />
              với sự hỗ trợ của <span className="relative">
                AI
                <Sparkles className="absolute -top-6 -right-8 text-amber-400 w-10 h-10" />
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Nest AI giúp tân sinh viên Đại học Đồng Tháp tìm kiếm phòng trọ an toàn, 
              phù hợp ngân sách và gần trường chỉ trong vài giây.
            </p>

            <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-2xl shadow-blue-100 flex flex-col md:flex-row gap-2 border border-slate-100">
              <div className="flex-grow flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 py-3">
                <MapPin className="text-blue-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Khu vực (Phường 6, Phường 4...)" 
                  className="w-full outline-none text-slate-700 font-medium"
                />
              </div>
              <div className="flex-grow flex items-center px-4 gap-3 py-3">
                <Zap className="text-amber-500" size={20} />
                <select className="w-full outline-none text-slate-700 font-medium bg-transparent">
                  <option>Tất cả mức giá</option>
                  <option>Dưới 1 triệu</option>
                  <option>1 - 2 triệu</option>
                  <option>Trên 2 triệu</option>
                </select>
              </div>
              <Link 
                to="/search"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                <Search size={20} />
                Tìm ngay
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Sparkles className="text-amber-500" />,
              title: "Gợi ý thông minh",
              desc: "AI phân tích nhu cầu để đưa ra danh sách phòng phù hợp nhất với bạn."
            },
            {
              icon: <ShieldCheck className="text-green-500" />,
              title: "An toàn tuyệt đối",
              desc: "Các phòng trọ đều được xác thực thông tin, đảm bảo an toàn cho sinh viên."
            },
            {
              icon: <MapPin className="text-blue-500" />,
              title: "Gần trường học",
              desc: "Dễ dàng tìm thấy các phòng trọ trong bán kính 2km quanh ĐH Đồng Tháp."
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Phòng trọ nổi bật</h2>
            <p className="text-slate-600">Những lựa chọn tốt nhất dành cho bạn trong tuần này.</p>
          </div>
          <Link to="/search" className="text-blue-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            Xem tất cả <ArrowRight size={20} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>

      {/* AI Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-12 translate-x-1/4" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Bạn chưa biết bắt đầu từ đâu? <br />
              Hãy để AI giúp bạn!
            </h2>
            <p className="text-blue-100 text-lg mb-12 leading-relaxed">
              Chỉ cần nhập ngân sách và sở thích, hệ thống trí tuệ nhân tạo của chúng tôi 
              sẽ tìm ra căn phòng hoàn hảo nhất dành riêng cho bạn.
            </p>
            <Link 
              to="/ai-recommend"
              className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all inline-flex items-center gap-3 shadow-xl"
            >
              <Sparkles size={24} />
              Trải nghiệm AI ngay
            </Link>
          </div>
          <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center"
            >
              <Sparkles size={100} className="text-white opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
