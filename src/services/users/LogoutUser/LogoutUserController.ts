import { Request, Response } from "express";
import { IRefreshTokenRepository } from "../../../repositories/RefreshTokenRepository";
import { IUsersRepository } from "../../../repositories/UsersRepository";
import { verify } from "jsonwebtoken";

export class LogoutUserController {
    constructor(
        private refreshRepository: IRefreshTokenRepository
    ) {}

    async handle(req: Request, res: Response) {
        // On client, also delete the access token
        const cookies = req.cookies;
        if(!cookies.jwt) return res.sendStatus(204);
        const refreshToken = cookies.jwt;
        const refreshTokenIsInDb = await this.refreshRepository.findByToken(refreshToken);
        if(!refreshTokenIsInDb) {
            res.clearCookie("jwt", { 
                httpOnly: true,
                sameSite: 'none',
                secure: true 
            });
            return res.sendStatus(204);
        }
        // Delete refresh token in db
        await this.refreshRepository.delete({ idRefreshToken: refreshTokenIsInDb.idRefreshToken });
        res.clearCookie("jwt", { 
            httpOnly: true,
            sameSite: 'none',
            secure: true 
        });
        return res.sendStatus(204);
    }
}