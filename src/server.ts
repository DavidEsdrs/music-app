import "reflect-metadata";
import "express-async-errors";
import express from "express";
import router from "./router";
import cors from "cors";
import { errorHandling } from "./middlewares/ErrorHandling";

const server = express();

server.use(cors({
    origin: process.env.FRONT_END_URL
}));

server.use(express.json());
server.use("/api", router);
server.use(errorHandling);

const SERVER_PORT = process.env.SERVER_PORT || 4343;

server.listen(SERVER_PORT, () => console.log(`running at ${SERVER_PORT}`));