import { instanceToPlain } from "class-transformer";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/UsersRepository";
import { IGetUserDTO } from "./GetUserDTO";

export class GetUserService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id }: IGetUserDTO) {
        const user = await this.usersRepository.findById(user_id);
        const fixedUser = instanceToPlain(user) as User;
        return {
            ...fixedUser,
            playlists_url: `/user/${user.idUser}/playlist`
        };
    }
}