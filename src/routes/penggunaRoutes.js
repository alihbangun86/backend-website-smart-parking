const express = require("express");
const router = express.Router();

const {
  registerPengguna,
  loginPengguna,
  editProfilPengguna,
  riwayatParkirPengguna,
  logoutPengguna,
  requestOtp,
  verifyOtp,
  resetPasswordOtp,
  getProfilPengguna,
  changePassword,
} = require("../controllers/penggunaController");

const upload = require("../utils/upload");
const auth = require("../middleware/auth");

/* AUTH ROUTES */

// REGISTER
router.post("/auth/register", upload.single("stnk"), registerPengguna);

// LOGIN
router.post("/auth/login", loginPengguna);

// LOGOUT
router.post("/auth/logout", logoutPengguna);

// REQUEST OTP
router.post("/auth/request-otp", requestOtp);

// VERIFY OTP
router.post("/auth/verify-otp", verifyOtp);

// RESET PASSWORD
router.post("/auth/reset-password", resetPasswordOtp);

/* USER ROUTES */

// GET PROFIL (admin atau user boleh akses)
router.get("/users/profile/:npm", auth, getProfilPengguna);

// UPDATE PROFIL
router.put(
  "/users/profile",
  auth,
  upload.fields([
    { name: "foto", maxCount: 1 },
    { name: "stnk", maxCount: 1 },
  ]),
  editProfilPengguna
);

// RIWAYAT PARKIR
router.get("/users/riwayat/:npm", auth, riwayatParkirPengguna);

// CHANGE PASSWORD
router.post("/users/change-password", auth, changePassword);

module.exports = router;