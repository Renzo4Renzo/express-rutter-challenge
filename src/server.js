import "dotenv/config";
import http from "http";
import express from "express";
import { mongoConnect } from "./services/connection.js";
import api from "./routes/api.js";

const PORT = process.env.RUTTER_CHALLENGE_PORT || 5050;

const app = express();
app.use(express.json());
app.use("/", api);

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
  });
}
startServer();
