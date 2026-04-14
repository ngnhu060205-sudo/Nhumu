import { motion } from "motion/react";
import { Star, MapPin, Ruler, Wifi, Wind, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface RoomCardProps {
  room: any;
  [key: string]: any;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 group"
    >
      <Link to={`/room/${room.id}`}>
        <div className="relative h-56 overflow-hidden">
          <img
            src={room.image}
            alt={room.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 flex items-center gap-1">
            <Star size={14} fill="currentColor" />
            4.8
          </div>
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
            {room.price.toLocaleString("vi-VN")}đ/tháng
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {room.title}
          </h3>
          
          <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
            <MapPin size={14} />
            <span className="line-clamp-1">{room.address}</span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50 border-dashed">
            <div className="flex gap-3 text-slate-400">
              {room.amenities.includes("wifi") && <Wifi size={18} />}
              {room.amenities.includes("air-con") && <Wind size={18} />}
              <ShieldCheck size={18} />
            </div>
            <div className="flex items-center gap-1 text-blue-600 font-medium text-sm">
              <Ruler size={14} />
              {room.distance}km đến trường
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
