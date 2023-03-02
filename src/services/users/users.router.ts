import { Router } from "express";
import { ensureAuthUser } from "../../middlewares/ensureAuthUser";
import { validateBody } from "../../utils/validations";
import { buildCreateUser } from "./CreateUser/buildCreateUser";
import { createUserSchema } from "./CreateUser/createUserSchema.middleware";
import { buildLoginService } from "./LoginUser/buildLoginService";
import { validateLoginUser } from "./LoginUser/LoginUser.middleware";

const router = Router();

router.post("/users", validateBody(createUserSchema), (req, res) => buildCreateUser().handle(req, res));
router.post("/login", validateLoginUser, (req, res) => buildLoginService().handle(req, res));

export { router as usersRouter };