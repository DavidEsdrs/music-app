import { Request, Response } from "express";
import { ForbiddenRequestError, UnauthorizedRequestError } from "../../../api/APIErrors";
import { InvalidCredentialsError } from "../../../api/APIErrors";
import { IUsersRepository } from "../../../repositories/UsersRepository";
import { JwtPayload, sign, verify, VerifyCallback } from "jsonwebtoken";
import { IRefreshTokenRepository } from "../../../repositories/RefreshTokenRepository";

export class RefreshTokenController {
    constructor(
        private refreshTokenRepository: IRefreshTokenRepository,
        private userRepository: IUsersRepository
    ) {}

    async handle(req: Request, res: Response) {
        const cookies = req.cookies;
        if(!cookies.jwt) {
            throw new Error("Invalid cookies!");
        }
        const refreshToken = cookies.jwt;
        const rt = await this.refreshTokenRepository.findByToken(refreshToken);
        if(!rt) throw new Error("Refresh token not found!");
        verify(
            refreshToken, 
            process.env.REFRESH_TOKEN_SECRET, 
            async (err: Error, decoded: JwtPayload) => {
                if(err) {
                    throw new Error("Invalid JWT");
                }
                const accessToken = sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, { 
                    expiresIn: process.env.ACCESS_TOKEN_LIFESPAN,
                    subject: decoded.sub
                });
                const user = await this.userRepository.findById(Number(decoded.sub));
                return res.json({ ...user, accessToken });
            }
        );
    }
}