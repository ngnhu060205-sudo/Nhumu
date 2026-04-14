import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Ruler, Wifi, Wind, ShieldCheck, Phone, User, ArrowLeft, Share2, Heart, Star, Mail } from "lucide-react";
import axios from "axios";
import { motion } from "motion/react";

export function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-slate-500 font-medium">Đang tải thông tin phòng...</p>
    </div>
  );

  if (!room) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy phòng trọ này</h2>
      <Link to="/search" className="text-blue-600 font-bold underline">Quay lại tìm kiếm</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/search" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors">
        <ArrowLeft size={20} />
        Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
            <img 
              src={room.image} 
              alt={room.title} 
              className="w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 right-6 flex gap-3">
              <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:text-red-500 transition-all shadow-lg">
                <Heart size={24} />
              </button>
              <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:text-blue-600 transition-all shadow-lg">
                <Share2 size={24} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mb-12">
            <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{room.title}</h1>
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={18} className="text-blue-600" />
                  <span className="text-lg">{room.address}</span>
                </div>
              </div>
              <div className="bg-blue-50 px-6 py-4 rounded-2xl text-center">
                <span className="block text-blue-600 font-bold text-2xl">{room.price.toLocaleString("vi-VN")}đ</span>
                <span className="text-blue-400 text-sm font-medium">mỗi tháng</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center gap-2">
                <Ruler size={24} className="text-blue-600" />
                <span className="text-slate-500 text-sm">Khoảng cách</span>
                <span className="font-bold text-slate-800">{room.distance}km</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center gap-2">
                <Star size={24} className="text-amber-500" />
                <span className="text-slate-500 text-sm">Đánh giá</span>
                <span className="font-bold text-slate-800">4.8/5</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center gap-2">
                <ShieldCheck size={24} className="text-green-600" />
                <span className="text-slate-500 text-sm">An ninh</span>
                <span className="font-bold text-slate-800">Rất tốt</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center gap-2">
                <User size={24} className="text-indigo-600" />
                <span className="text-slate-500 text-sm">Loại phòng</span>
                <span className="font-bold text-slate-800">{room.type === "private" ? "Phòng riêng" : "Ở ghép"}</span>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Mô tả chi tiết</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {room.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Tiện ích đi kèm</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: "wifi", label: "Wifi tốc độ cao", icon: <Wifi size={20} /> },
                  { id: "air-con", label: "Máy lạnh", icon: <Wind size={20} /> },
                  { id: "wc-private", label: "WC riêng", icon: <ShieldCheck size={20} /> },
                  { id: "parking", label: "Chỗ để xe", icon: <MapPin size={20} /> },
                  { id: "security", label: "Camera an ninh", icon: <ShieldCheck size={20} /> },
                  { id: "freedom", label: "Giờ giấc tự do", icon: <Ruler size={20} /> }
                ].map((amenity) => (
                  <div 
                    key={amenity.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border ${
                      room.amenities.includes(amenity.id) 
                        ? "bg-blue-50 border-blue-100 text-blue-700" 
                        : "bg-slate-50 border-slate-100 text-slate-400 opacity-50"
                    }`}
                  >
                    {amenity.icon}
                    <span className="font-medium">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Contact */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl sticky top-24">
            <h3 className="text-xl font-bold text-slate-800 mb-8">Thông tin chủ trọ</h3>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl">
                {room.landlordName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">{room.landlordName}</h4>
                <p className="text-slate-500">Chủ trọ đã xác thực</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <a 
                href={`tel:${room.landlordPhone}`}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                <Phone size={20} />
                {room.landlordPhone}
              </a>
              <button className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-50 transition-all">
                <Mail size={20} />
                Nhắn tin trực tiếp
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                Vị trí trên bản đồ
              </h4>
              <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/map/400/400`} 
                  alt="Map placeholder" 
                  className="w-full h-full object-cover opacity-50 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                    <MapPin size={24} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center italic">
                Bản đồ chỉ mang tính chất minh họa vị trí tương đối.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
