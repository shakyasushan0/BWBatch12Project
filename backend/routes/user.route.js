import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import checkAuth from "../middleware/checkauth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkAuth, logout);
router.get("/profile", checkAuth, getProfile);
router.put("/updateprofile", checkAuth, updateProfile);

export default router;
