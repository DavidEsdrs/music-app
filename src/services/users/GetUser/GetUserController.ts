import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { IGetUserDTO } from "./GetUserDTO";

interface IGetUserService {
    execute(args: IGetUserDTO): Promise<User>;
}

export class GetUserController {
    constructor(
        private service: IGetUserService
    ) {}

    async handle(req: Request, res: Response) {
        const id = Number(req.params.id)
        const { user_id: requester_id } = req;
        const user = await this.service.execute({ user_id: id });
        return res.json(user);
    }
}