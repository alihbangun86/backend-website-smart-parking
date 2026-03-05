const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  loginAdmin,
  verifikasiPengguna,
  getDataPengguna,
  generateRFID,
  dashboardSummary,
  getDataParkir,
  exportParkirPDF,
  hapusPengguna,
  updateKuotaParkir,
  updateSlotParkir,
} = require("../controllers/adminController");

/* AUTH ADMIN */

// LOGIN ADMIN
router.post("/login", loginAdmin);

// middleware auth (admin atau user)
router.use(auth);

/* MANAJEMEN PENGGUNA */

// GET semua pengguna
router.get("/pengguna", getDataPengguna);

// VERIFIKASI / AKTIVASI AKUN
router.put("/pengguna/verifikasi", verifikasiPengguna);

// HAPUS PENGGUNA
router.delete("/pengguna/:npm", hapusPengguna);

// UPDATE KUOTA
router.put("/kuota", updateKuotaParkir);

/* RFID */

router.post("/rfid/generate", generateRFID);

/* DASHBOARD */

router.get("/dashboard/summary", dashboardSummary);
router.put("/slot", updateSlotParkir);

/* DATA PARKIR */

router.get("/parkir", getDataParkir);
router.get("/parkir/export/pdf", exportParkirPDF);

module.exports = router;