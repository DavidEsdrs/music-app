import "reflect-metadata";
import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const server = express();

server.use(express.json());
server.use(router);

const SERVER_PORT = process.env.SERVER_PORT || 4343;

server.listen(SERVER_PORT, () => console.log(`running at ${SERVER_PORT}`));