import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, DollarSign, Users, Heart, ArrowRight, Loader2, Info } from "lucide-react";
import { getAiRecommendations } from "../services/aiService";
import axios from "axios";
import { RoomCard } from "../components/RoomCard";

export function AiRecommend() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    budget: "1500000",
    gender: "male",
    peopleCount: "1",
    priorities: [] as string[]
  });
  const [results, setResults] = useState<any>(null);
  const [allRooms, setAllRooms] = useState<any[]>([]);

  const handlePriorityToggle = (priority: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const roomsRes = await axios.get("/api/rooms");
      const rooms = roomsRes.data;
      setAllRooms(rooms);
      
      const aiResults = await getAiRecommendations({
        ...formData,
        rooms
      });
      setResults(aiResults);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi lấy gợi ý từ AI. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600"
        >
          <Sparkles size={32} />
        </motion.div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Gợi ý phòng trọ bằng AI</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Hãy cho AI biết nhu cầu của bạn, chúng tôi sẽ tìm ra căn phòng phù hợp nhất 
          và giải thích lý do tại sao nó tốt cho bạn.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-50 border border-slate-100 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 md:p-12"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                Thông tin cơ bản
              </h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-slate-700 font-bold mb-4 flex items-center gap-2">
                    <DollarSign size={18} className="text-blue-600" />
                    Ngân sách tối đa của bạn?
                  </label>
                  <input 
                    type="range" 
                    min="500000" 
                    max="5000000" 
                    step="100000"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm font-bold text-blue-600 mt-4 bg-blue-50 p-3 rounded-xl">
                    <span>500.000đ</span>
                    <span className="text-lg">{Number(formData.budget).toLocaleString("vi-VN")}đ</span>
                    <span>5.000.000đ</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-slate-700 font-bold mb-4">Giới tính của bạn?</label>
                    <div className="flex gap-4">
                      {["male", "female"].map((g) => (
                        <button
                          key={g}
                          onClick={() => setFormData({...formData, gender: g})}
                          className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${
                            formData.gender === g 
                              ? "bg-blue-50 border-blue-600 text-blue-600" 
                              : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                          }`}
                        >
                          {g === "male" ? "Nam" : "Nữ"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-4 flex items-center gap-2">
                      <Users size={18} className="text-blue-600" />
                      Số người ở?
                    </label>
                    <select 
                      value={formData.peopleCount}
                      onChange={(e) => setFormData({...formData, peopleCount: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-700"
                    >
                      <option value="1">Ở một mình</option>
                      <option value="2">Ở 2 người</option>
                      <option value="3">Ở 3 người trở lên</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full mt-12 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                Tiếp theo
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 md:p-12"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                Ưu tiên của bạn
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-12">
                {[
                  { id: "quiet", label: "Yên tĩnh", icon: "🤫" },
                  { id: "near", label: "Gần trường", icon: "🏫" },
                  { id: "cheap", label: "Giá rẻ", icon: "💰" },
                  { id: "modern", label: "Tiện nghi", icon: "✨" },
                  { id: "security", label: "An ninh", icon: "🛡️" },
                  { id: "freedom", label: "Giờ giấc tự do", icon: "🔑" }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePriorityToggle(p.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 ${
                      formData.priorities.includes(p.id)
                        ? "bg-blue-50 border-blue-600 text-blue-600"
                        : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <span className="text-3xl">{p.icon}</span>
                    <span className="font-bold">{p.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all"
                >
                  Quay lại
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      AI đang phân tích...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Nhận gợi ý AI
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && results && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12"
            >
              <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl mb-12 flex gap-4 items-start">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">Lời khuyên từ Nest AI</h3>
                  <p className="text-amber-800 leading-relaxed">{results.advice}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-8">Phòng trọ phù hợp nhất cho bạn</h2>
              
              <div className="space-y-12">
                {results.recommendations.map((rec: any, idx: number) => {
                  const room = allRooms.find(r => r.id === rec.roomId);
                  if (!room) return null;
                  return (
                    <div key={idx} className="bg-slate-50 rounded-[2rem] p-6 md:p-8 border border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <RoomCard room={room} />
                        <div className="flex flex-col justify-center">
                          <div className="inline-flex items-center gap-2 text-blue-600 font-bold mb-4 bg-white px-4 py-2 rounded-full w-fit shadow-sm">
                            <Sparkles size={18} />
                            Tại sao AI chọn phòng này?
                          </div>
                          <p className="text-slate-700 leading-relaxed text-lg italic">
                            "{rec.reason}"
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => {
                  setStep(1);
                  setResults(null);
                }}
                className="w-full mt-12 bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all"
              >
                Thử lại với nhu cầu khác
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
