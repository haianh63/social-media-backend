import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import auth from "./app/routes/auth.js";
import post from "./app/routes/post.js";
import user from "./app/routes/user.js";
import chat from "./app/routes/chat.js";
import comment from "./app/routes/comment.js";
import http from "http";
import { Server } from "socket.io";
import { saveMessages } from "./app/database/messages.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/post", post);
app.use("/user", user);
app.use("/chat", chat);
app.use("/comment", comment);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection", (client) => {
  console.log(`Connected: ${client.id}`);

  client.on("joinRoom", (room) => {
    client.join(room);
  });

  client.on(
    "sendMessage",
    async ({ sender_id, receiver_id, content, name, avatar_src }) => {
      //console.log({ sender_id, receiver_id, content, name, avatar_src });
      io.to(receiver_id).emit("receive-message", {
        sender_id,
        receiver_id,
        content,
        name,
        avatar_src,
      });

      await saveMessages({ sender_id, receiver_id, content });
    }
  );
});
