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
const authUser = require("../middleware/authUser");

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

// GET PROFIL
router.get("/users/profile/:npm", authUser, getProfilPengguna);

// UPDATE PROFIL
router.put(
  "/users/profile",
  authUser,
  upload.fields([
    { name: "foto", maxCount: 1 },
    { name: "stnk", maxCount: 1 },
  ]),
  editProfilPengguna
);

// RIWAYAT PARKIR
router.get("/users/riwayat/:npm", authUser, riwayatParkirPengguna);

// CHANGE PASSWORD
router.post("/users/change-password", authUser, changePassword);

module.exports = router;