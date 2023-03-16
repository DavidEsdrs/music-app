import cookieParser from "cookie-parser";
import { Router } from "express";
import { ensureAuthUser } from "../../middlewares/ensureAuthUser";
import { TypeormRefreshTokenRepository } from "../../repositories/typeorm/mysql/MySqlRefreshTokenRepository";
import { TypeormUsersRepository } from "../../repositories/typeorm/mysql/TypeormUsersRepository";
import { validateBody } from "../../utils/validations";
import { buildCreateUser } from "./CreateUser/buildCreateUser";
import { createUserSchema } from "./CreateUser/createUserSchema.middleware";
import { buildGetUser } from "./GetUser/buildGetUser";
import { buildLoginService } from "./LoginUser/buildLoginService";
import { loginSchema } from "./LoginUser/LoginUser.middleware";
import { LogoutUserController } from "./LogoutUser/LogoutUserController";
import { RefreshTokenController } from "./RefreshToken/RefreshTokenController";

const router = Router();

router.post("/users", validateBody(createUserSchema), (req, res) => buildCreateUser().handle(req, res));
router.post("/login", validateBody(loginSchema), (req, res) => buildLoginService().handle(req, res));
router.get("/get", (req, res) => buildGetUser().handle(req, res));
router.get("/refresh", (req, res) => new RefreshTokenController(TypeormRefreshTokenRepository, TypeormUsersRepository).handle(req, res));
router.get("/logout", (req, res) => new LogoutUserController(TypeormRefreshTokenRepository).handle(req, res));

export { router as usersRouter };