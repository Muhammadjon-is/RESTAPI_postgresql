import express from "express";
import indexRouter from "./routes/index.js";

import * as dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(express.json());

// Inital Route
server.use("/api", indexRouter);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("server is running on", PORT);
});
