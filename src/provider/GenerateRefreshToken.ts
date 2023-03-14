import { sign } from "jsonwebtoken";
import { IRefreshTokenRepository } from "../repositories/RefreshTokenRepository";

export class GenerateRefreshToken {
    constructor(
        private refreshTokenRepository: IRefreshTokenRepository
    ) {}

    async execute(args: { subject: number, email: string }) {
        const refreshToken = sign({ email: args.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_LIFESPAN,
            subject: String(args.subject)
        });
        const rt = this.refreshTokenRepository.create({ token: refreshToken, user_id: args.subject });
        await this.refreshTokenRepository.save(rt);
        return refreshToken;
    }
}