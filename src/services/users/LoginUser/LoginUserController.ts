import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/UsersRepository";
import { ILoginUserDTO } from "./LoginUserDTO";

interface ILoginUserService {
    execute(args: ILoginUserDTO): Promise<User & { token: string }>;
}

export class LoginUserController {
    constructor(
        private service: ILoginUserService
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await this.service.execute({ email, password });
        return res.json(token);
    }
}