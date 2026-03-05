const jwt = require("jsonwebtoken");

const authAdminOrUser = (req, res, next) => {
  console.log("AUTH ADMIN OR USER HIT");

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Token tidak ditemukan",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // cek sebagai USER
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

      if (decodedUser.id_pengguna || decodedUser.npm) {
        req.user = decodedUser;
        req.role = "user";
        return next();
      }
    } catch (err) {}

    // cek sebagai ADMIN
    const decodedAdmin = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    if (decodedAdmin.id_admin) {
      req.admin = decodedAdmin;
      req.role = "admin";
      return next();
    }

    return res.status(403).json({
      status: "error",
      message: "Token tidak valid",
    });

  } catch (err) {
    return res.status(403).json({
      status: "error",
      message: "Token tidak valid atau kadaluarsa",
    });
  }
};

module.exports = authAdminOrUser;