import express from "express";
import upload from "../middlewares/fileUpload.js";
import { verifyToken, verifyUser } from "../middlewares/auth.js";
import {
  createPost,
  deletePostByPostId,
  getPostByUserId,
} from "../database/posts.js";
import deleteFile from "../utils/deleteFile.js";

const router = express.Router();
const uploadPath = "uploads";

router.get("/:id", async (req, res) => {
  try {
    const result = await getPostByUserId(req.params.id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400);
  }
});
router.post(
  "/:id/create",
  verifyToken,
  verifyUser,
  upload.single("image"),
  async (req, res) => {
    if (!req.body.content && !req.file) {
      return res.sendStatus(400);
    }

    const content = req.body.content || null;
    const file = req.file;
    const filePath = file ? `${uploadPath}/${req.file.filename}` : null;

    try {
      const result = await createPost({
        userId: req.params.id,
        content,
        image: filePath,
      });
      console.log(result);
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(400);
    }
  }
);

router.patch("/edit", (req, res) => {});

router.delete(
  "/:id/delete/:postId",
  verifyToken,
  verifyUser,
  async (req, res) => {
    try {
      const postId = req.params.postId;
      const result = await deletePostByPostId(postId);
      if (result.length > 0) {
        deleteFile(`public/${result[0].img_src}`);
      }
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(400);
    }
  }
);
export default router;
