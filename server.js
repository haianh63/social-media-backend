import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import auth from "./app/routes/auth.js";
import post from "./app/routes/post.js";
import verifyToken from "./app/middlewares/auth.js";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/post", post);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
