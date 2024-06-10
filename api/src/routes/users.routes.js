const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users.controllers");
const authenticate = require("../config/auth");

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.post("/verifyToken", authenticate, (req, res) => {
  res.status(200).json({ message: "token is valid" });
});
router.get("/dashboard", authenticate, (req, res) => {
  res.status(200).json({ page: "Dashboard" });
});
router.delete("/delete/:id", authenticate, userControllers.deleteUser);
router.put("/edit/:id", authenticate, userControllers.editUser);

module.exports = router;
