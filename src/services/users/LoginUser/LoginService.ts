import { verify } from "argon2";
import { sign } from "jsonwebtoken";
import { instanceToPlain } from "class-transformer";
import { InvalidCredentialsError } from "../../../api/APIErrors";
import { IUsersRepository } from "../../../repositories/UsersRepository";
import { ILoginUserDTO } from "./LoginUserDTO";
import { User } from "../../../entities/User";

export class LoginService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute(args: ILoginUserDTO) {
        const user = await this.usersRepository.findByEmail(args.email);
        if(!user) {
            throw new InvalidCredentialsError();
        }
        const correctCredentials = await verify(user.password, args.password, { salt: Buffer.from(user.email) });
        if(!correctCredentials) {
            throw new InvalidCredentialsError();
        }
        const token = sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { subject: String(user.idUser), expiresIn: process.env.ACCESS_TOKEN_LIFESPAN });
        return {
            ...instanceToPlain(user),
            token
        } as User & { token: string };
    }
}