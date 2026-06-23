import express from "express";
import {
  register,
  login,
} from "../controllers/auth.controller.js";
import generateToken from "../utils/generateToken.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;