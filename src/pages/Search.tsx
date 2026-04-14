import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Filter, MapPin, Ruler, DollarSign, LayoutGrid, List } from "lucide-react";
import { RoomCard } from "../components/RoomCard";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";

export function Search() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    type: "",
    distance: "5"
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.type) params.append("type", filters.type);
      if (filters.distance) params.append("distance", filters.distance);

      const res = await axios.get(`/api/rooms?${params.toString()}`);
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Tìm kiếm phòng trọ</h1>
          <p className="text-slate-600">Tìm thấy {rooms.length} kết quả phù hợp với yêu cầu của bạn.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Nhập địa chỉ, tên phòng..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-all flex items-center gap-2 font-medium ${
              showFilters ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Filter size={20} />
            <span className="hidden sm:inline">Bộ lọc</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 1024) && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`${showFilters ? "block" : "hidden lg:block"} lg:col-span-1 space-y-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit sticky top-24`}
            >
              <div>
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <DollarSign size={18} className="text-blue-600" />
                  Khoảng giá (VNĐ)
                </h3>
                <div className="space-y-3">
                  <input 
                    type="number" 
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Từ" 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                  <input 
                    type="number" 
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Đến" 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <LayoutGrid size={18} className="text-blue-600" />
                  Loại phòng
                </h3>
                <select 
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-blue-500 transition-all"
                >
                  <option value="">Tất cả</option>
                  <option value="private">Phòng riêng</option>
                  <option value="shared">Ở ghép</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Ruler size={18} className="text-blue-600" />
                    Khoảng cách
                  </h3>
                  <span className="text-blue-600 font-bold">{filters.distance}km</span>
                </div>
                <input 
                  type="range" 
                  name="distance"
                  min="0.5" 
                  max="10" 
                  step="0.5"
                  value={filters.distance}
                  onChange={handleFilterChange}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>0.5km</span>
                  <span>10km</span>
                </div>
              </div>

              <button 
                onClick={fetchRooms}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Áp dụng bộ lọc
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Room Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 4, 5].map(i => (
                <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-20 text-center border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon size={40} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-slate-500">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
