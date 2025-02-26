import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getChatMessage, getChatUser } from "../controllers/chat.js";
const router = Router();

router.get("/", verifyToken, getChatUser);

router.get("/:userId", verifyToken, getChatMessage);
export default router;
