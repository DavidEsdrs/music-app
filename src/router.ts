import { Router, Request, Response } from "express";
import AppDataSource from "./ormconfig";
import { buildCreateUser } from "./services/users/CreateUser/buildCreateUser";
import { buildLoginService } from "./services/users/LoginUser/buildLoginService";
import { validateLoginUser } from "./services/users/LoginUser/LoginUser.middleware";

const router = Router();

router.get("/", (req, res) => res.json("running"));

router.post("/users", (req, res) => buildCreateUser().handle(req, res));
router.post("/login", validateLoginUser, (req, res) => buildLoginService().handle(req, res));

export default router;