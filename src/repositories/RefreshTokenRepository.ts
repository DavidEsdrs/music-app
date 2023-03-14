import { RefreshToken } from "../entities/RefreshToken";
import { GenericRepository } from "./GenericRepository";

export interface IRefreshTokenRepository extends GenericRepository<RefreshToken> {
    findByUser(user_id: number): Promise<RefreshToken>;
    findByToken(token: string): Promise<RefreshToken>;
}