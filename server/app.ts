import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import loginrouter from "./routers/login";
import userRouter from "./routers/users";
import recordRouter from "./routers/records";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import postRouter from "./routers/posts";
import commentRouter from "./routers/comments";
import likeRouter from "./routers/likes";

createConnection()
  .then(async () => {
    console.log("mysql connected!!");
  })
  .catch((err) => console.log("mysql connected ERR:", err));

const app = express();
const client = "https://gg-one-delta.vercel.app";
const local = "http://localhost:3000";
const corsOption = {
  origin: [`${local}`],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
};
app.use("/userimg", express.static("images/userImage"));
app.use("/postimg", express.static("images/postImage"));
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/sign", loginrouter);
app.use("/user", userRouter);
app.use("/record", recordRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.use("/posts", postRouter);
app.get("/", (req, res) => {
  res.status(200).send("server is work!!");
});

export default app;
