import { Router } from "express";
import { verifyToken, verifyUser } from "../middlewares/auth.js";
import upload from "../middlewares/fileUpload.js";
import { searchUser, getUserInfo, editProfile } from "../controllers/user.js";
const router = Router();

router.get("/search", searchUser);
router.get("/:id", getUserInfo);

const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]);
router.post("/:id/edit", verifyToken, verifyUser, cpUpload, editProfile);

export default router;
