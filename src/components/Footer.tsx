import { Home, Mail, Phone, MapPin, Facebook, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Home size={18} />
              </div>
              <span className="text-xl font-bold text-white">Nest AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Nền tảng hỗ trợ sinh viên Đại học Đồng Tháp tìm kiếm phòng trọ an toàn, tiện lợi và phù hợp nhất.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Liên kết</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Hướng dẫn tìm trọ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-500" />
                <span>783 Phạm Hữu Lầu, Phường 6, TP. Cao Lãnh, Đồng Tháp</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <span>0277 3881 518</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <span>contact@dthu.edu.vn</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Theo dõi</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-all">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Nest AI - Dự án hỗ trợ sinh viên ĐH Đồng Tháp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
