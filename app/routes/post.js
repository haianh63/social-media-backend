import express from "express";
import multer from "multer";

const uploadPath = "./uploads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();
router.post("/create", upload.single("file"), (req, res) => {
  if (!req.body.content && !req.file) {
    res.sendStatus(400);
  }

  const content = req.body.content || null;
  const file = req.file;
  const filePath = file ? `${uploadPath}/${req.file.filename}` : null;
  console.log(content, filePath);

  res.sendStatus(200);
});

router.patch("/edit", (req, res) => {});

router.delete("/delete", (req, res) => {});
export default router;
