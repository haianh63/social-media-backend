import { Router } from "express";
import { verifyToken, verifyUser } from "../middlewares/auth.js";
import {
  deletePostComment,
  getPostComment,
  postComment,
} from "../controllers/comment.js";
const router = Router();
router.get("/:postId", getPostComment);

router.post("/:postId", verifyToken, postComment);

router.delete(
  "/:postId/:id/:commentId",
  verifyToken,
  verifyUser,
  deletePostComment
);
export default router;
