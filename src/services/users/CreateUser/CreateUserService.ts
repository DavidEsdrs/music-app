import { IUsersRepository } from "../../../repositories/UsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";
import { hash } from "argon2";
import { EmailAlreadyExistsError } from "../../../api/APIErrors";

export class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute(args: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(args.email);
        if(userAlreadyExists) {
            throw new EmailAlreadyExistsError();
        }
        const passwordHash = await hash(args.password);
        const user = this.usersRepository.create({
            ...args,
            password: passwordHash
        });
        await this.usersRepository.save(user);
        return user;
    }
}