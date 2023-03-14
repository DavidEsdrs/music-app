import { IUsersRepository } from "../../../repositories/UsersRepository";
import cookieParser from "cookie-parser";

export class RefreshTokenService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute() {
        
    }
}