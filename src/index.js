require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");

const { connectToDatabase } = require("./config/database");

require("./utils/kuotaBulanan");

// ROUTES
const penggunaRoutes = require("./routes/penggunaRoutes");
const adminRoutes = require("./routes/adminRoutes");
const statistikRoutes = require("./routes/statistikRoutes");
const parkirRoutes = require("./routes/parkirRoutes");
const statcardRoutes = require("./routes/statcardRoutes");

const app = express();
const server = http.createServer(app);

/* BASIC CONFIG */
app.disable("x-powered-by");

/* CORS (SUPPORT DEV + PROD) */
app.use(
  cors({
    origin: ["http://localhost:3000", "https://smartpark.my.id"],
    credentials: true,
  })
);

/* SESSION */
app.use(
  session({
    secret: "SMARTPARK_SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true kalau HTTPS + reverse proxy
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
    },
  })
);

/* BODY PARSER */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));

/* REQUEST LOGGER */
app.use((req, res, next) => {
  console.log("➡️ HIT:", req.method, req.originalUrl);
  next();
});

/* DATABASE */
connectToDatabase();

/* SOCKET.IO */
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://smartpark.my.id"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

/* ROUTES */
app.use("/api/pengguna", penggunaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/parkir", parkirRoutes);
app.use("/api/statistik", statistikRoutes);
app.use("/api/statcard", statcardRoutes);

/* 404 */
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
  });
});

/* ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

/* START */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server aktif di port ${PORT}`);
});