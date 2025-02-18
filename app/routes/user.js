import { Router } from "express";
import { findUserByUserId, updateUserProfile } from "../database/users.js";
import { verifyToken, verifyUser } from "../middlewares/auth.js";
import upload from "../middlewares/fileUpload.js";
const router = Router();
const uploadPath = "uploads";
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    let user = await findUserByUserId(userId);
    user.length === 0 ? (user = null) : (user = user[0]);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error.message,
    });
  }
});

const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]);
router.post(
  "/:id/edit",
  verifyToken,
  verifyUser,
  cpUpload,
  async (req, res) => {
    const userId = req.params.id;
    if (!req.body.name && !req.files["avatar"] && !req.files["cover"]) {
      res.sendStatus(400);
    }

    const name = req.body.name || null;

    let avatarFile = req.files["avatar"];
    if (avatarFile) avatarFile = avatarFile[0];
    let coverFile = req.files["cover"];
    if (coverFile) coverFile = coverFile[0];
    const avatarFilePath = avatarFile
      ? `${uploadPath}/${avatarFile.filename}`
      : null;

    const coverFilePath = coverFile
      ? `${uploadPath}/${coverFile.filename}`
      : null;

    try {
      const result = await updateUserProfile({
        user_id: userId,
        name: name,
        avatar_src: avatarFilePath,
        cover_src: coverFilePath,
      });

      return res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(500);
    }
  }
);

export default router;
