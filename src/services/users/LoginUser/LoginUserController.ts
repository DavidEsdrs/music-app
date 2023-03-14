import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken";
import { IUsersRepository } from "../../../repositories/UsersRepository";
import { ILoginUserDTO } from "./LoginUserDTO";

interface ILoginUserService {
    execute(args: ILoginUserDTO): Promise<User & { token: string }>;
}

interface IGenerateRefreshToken {
    execute(args: { subject: number, email: string }): Promise<string>;
}

export class LoginUserController {
    constructor(
        private service: ILoginUserService,
        private generateRefreshToken: IGenerateRefreshToken
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await this.service.execute({ email, password });
        const refreshToken = await this.generateRefreshToken.execute({ email, subject: token.idUser });
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
            domain: "local.host.br"
        });
        return res.json({
            ...token,
            token: token.token
        });
    }
}