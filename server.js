import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import auth from "./app/routes/auth.js";
import post from "./app/routes/post.js";
import user from "./app/routes/user.js";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/post", post);
app.use("/user", user);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
