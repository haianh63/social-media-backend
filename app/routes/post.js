import express from "express";
import upload from "../middlewares/fileUpload.js";
import { verifyToken, verifyUser } from "../middlewares/auth.js";
import {
  createUserPost,
  deletePost,
  getPosts,
  getReaction,
  getUserPosts,
  reactPost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getUserPosts);
router.post(
  "/:id/create",
  verifyToken,
  verifyUser,
  upload.single("image"),
  createUserPost
);

router.post("/react", verifyToken, reactPost);

router.get("/react/:postId", getReaction);

router.delete("/:id/delete/:postId", verifyToken, verifyUser, deletePost);
export default router;
