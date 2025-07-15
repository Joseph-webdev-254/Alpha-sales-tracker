import express from "express";
import { createUser, authorizeUser } from "../controllers/User.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", authorizeUser);
export default router;
