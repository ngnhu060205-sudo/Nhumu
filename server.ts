import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mock Database (Simple in-memory for demo)
  let rooms = [
    {
      id: "1",
      title: "Phòng trọ cao cấp gần ĐH Đồng Tháp",
      price: 1500000,
      address: "Phường 6, Cao Lãnh, Đồng Tháp",
      distance: 0.5,
      type: "private",
      amenities: ["wifi", "air-con", "wc-private"],
      description: "Phòng mới xây, thoáng mát, an ninh tốt.",
      image: "https://picsum.photos/seed/room1/800/600",
      landlordId: "l1",
      landlordName: "Nguyễn Văn A",
      landlordPhone: "0901234567"
    },
    {
      id: "2",
      title: "Phòng trọ giá rẻ cho sinh viên",
      price: 800000,
      address: "Phường 4, Cao Lãnh, Đồng Tháp",
      distance: 1.2,
      type: "shared",
      amenities: ["wifi"],
      description: "Phòng ở ghép, tiết kiệm chi phí cho tân sinh viên.",
      image: "https://picsum.photos/seed/room2/800/600",
      landlordId: "l2",
      landlordName: "Trần Thị B",
      landlordPhone: "0907654321"
    }
  ];

  // API Routes
  app.get("/api/rooms", (req, res) => {
    const { minPrice, maxPrice, type, distance } = req.query;
    let filteredRooms = [...rooms];

    if (minPrice) filteredRooms = filteredRooms.filter(r => r.price >= Number(minPrice));
    if (maxPrice) filteredRooms = filteredRooms.filter(r => r.price <= Number(maxPrice));
    if (type) filteredRooms = filteredRooms.filter(r => r.type === type);
    if (distance) filteredRooms = filteredRooms.filter(r => r.distance <= Number(distance));

    res.json(filteredRooms);
  });

  app.get("/api/rooms/:id", (req, res) => {
    const room = rooms.find(r => r.id === req.params.id);
    if (room) res.json(room);
    else res.status(404).json({ message: "Không tìm thấy phòng" });
  });

  app.post("/api/rooms", (req, res) => {
    const newRoom = { ...req.body, id: String(rooms.length + 1) };
    rooms.push(newRoom);
    res.status(201).json(newRoom);
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Simple mock auth
    if (email && password) {
      res.json({
        token: "mock-jwt-token",
        user: { id: "u1", email, name: "Người dùng Test", role: "student" }
      });
    } else {
      res.status(400).json({ message: "Thiếu thông tin đăng nhập" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
