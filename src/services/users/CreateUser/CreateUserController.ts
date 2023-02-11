import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { ICreateUserDTO } from "./CreateUserDTO";

interface ICreateUserService {
    execute(args: ICreateUserDTO): Promise<User>;
}

export class CreateUserController {
    constructor(
        private service: ICreateUserService
    ) {}

    async handle(req: Request, res: Response) {
        const { username, email, password, bio } = req.body;
        const user = await this.service.execute({ username, email, password, bio });
        return res.json(user);
    }
}