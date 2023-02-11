import { verify } from "argon2";
import { sign } from "jsonwebtoken";
import { InvalidCredentialsError } from "../../../api/APIErrors";
import { IUsersRepository } from "../../../repositories/UsersRepository";
import { ILoginUserDTO } from "./LoginUserDTO";

export class LoginService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute(args: ILoginUserDTO) {
        const user = await this.usersRepository.findByEmail(args.email);
        if(!user) {
            throw new InvalidCredentialsError();
        }
        const correctCredentials = await verify(user.password, args.password);
        if(!correctCredentials) {
            throw new InvalidCredentialsError();
        }
        const token = sign({ email: user.email }, process.env.JWT_TOKEN, {
            subject: user.email,
            expiresIn: "1d"
        });
        return token;
    }
}