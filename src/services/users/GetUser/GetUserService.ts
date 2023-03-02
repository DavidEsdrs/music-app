import { IUsersRepository } from "../../../repositories/UsersRepository";
import { IGetUserDTO } from "./GetUserDTO";

export class GetUserService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id }: IGetUserDTO) {
        const user = await this.usersRepository.findById(user_id);
        return {
            ...user,
            playlists_url: `/user/${user.idUser}/playlist`
        };
    }
}