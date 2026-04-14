import React, { useState } from "react";
import { motion } from "motion/react";
import { Upload, MapPin, DollarSign, Ruler, Info, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function AddRoom() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    address: "",
    distance: "1",
    type: "private",
    description: "",
    amenities: [] as string[]
  });

  const handleAmenityToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/rooms", {
        ...formData,
        price: Number(formData.price),
        distance: Number(formData.distance),
        image: `https://picsum.photos/seed/${Date.now()}/800/600`,
        landlordName: "Người dùng Test",
        landlordPhone: "0901234567"
      });
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      alert("Có lỗi xảy ra khi đăng tin. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Đăng tin thành công!</h1>
          <p className="text-slate-500 text-lg">Bài đăng của bạn đang được kiểm duyệt và sẽ sớm hiển thị.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors">
        <ArrowLeft size={20} />
        Quay lại Dashboard
      </Link>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-50 border border-slate-100 p-8 md:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Đăng tin phòng trọ</h1>
        <p className="text-slate-500 mb-12">Cung cấp thông tin chi tiết để sinh viên dễ dàng tìm thấy bạn.</p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Info size={20} className="text-blue-600" />
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Tiêu đề bài đăng</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium"
                  placeholder="Ví dụ: Phòng trọ cao cấp Phường 6 gần ĐH Đồng Tháp"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Giá thuê (VNĐ/tháng)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="number" 
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium"
                      placeholder="1500000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Loại phòng</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium"
                  >
                    <option value="private">Phòng riêng</option>
                    <option value="shared">Ở ghép</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              Vị trí & Khoảng cách
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Địa chỉ chi tiết</label>
                <input 
                  type="text" 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium"
                  placeholder="Số nhà, tên đường, phường..."
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="text-sm font-bold text-slate-700">Khoảng cách đến ĐH Đồng Tháp</label>
                  <span className="text-blue-600 font-bold">{formData.distance}km</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="10" 
                  step="0.1"
                  value={formData.distance}
                  onChange={(e) => setFormData({...formData, distance: e.target.value})}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6">Tiện ích & Hình ảnh</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: "wifi", label: "Wifi" },
                { id: "air-con", label: "Máy lạnh" },
                { id: "wc-private", label: "WC riêng" },
                { id: "parking", label: "Chỗ để xe" },
                { id: "security", label: "An ninh" },
                { id: "freedom", label: "Giờ giấc tự do" }
              ].map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => handleAmenityToggle(a.id)}
                  className={`p-4 rounded-xl border-2 font-bold transition-all text-sm ${
                    formData.amenities.includes(a.id)
                      ? "bg-blue-50 border-blue-600 text-blue-600"
                      : "bg-white border-slate-100 text-slate-400"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
            
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-blue-400 transition-all cursor-pointer bg-slate-50">
              <Upload className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">Kéo thả hoặc click để tải ảnh phòng trọ</p>
              <p className="text-slate-400 text-xs mt-2">Định dạng JPG, PNG tối đa 5MB</p>
            </div>
          </section>

          {/* Description */}
          <section>
            <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Mô tả thêm</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium"
              placeholder="Mô tả về giờ giấc, điện nước, quy định chung..."
            />
          </section>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-70"
            >
              {loading ? "Đang xử lý..." : "Đăng tin ngay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
