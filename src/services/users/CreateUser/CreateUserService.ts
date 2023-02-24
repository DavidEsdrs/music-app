import { IUsersRepository } from "../../../repositories/UsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";
import { hash } from "argon2";
import { EmailAlreadyExistsError } from "../../../api/APIErrors";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { fulfillUser } from "../../../utils/fulfillInfo";

type CreateUserServiceArgs = {
    usersRepository: IUsersRepository,
    playlistsRepository: IPlaylistsRepository
}

export class CreateUserService {
    constructor(
        private services: CreateUserServiceArgs
    ) {}

    async execute(args: ICreateUserDTO) {
        const userAlreadyExists = await this.services.usersRepository.findByEmail(args.email);
        if(userAlreadyExists) {
            throw new EmailAlreadyExistsError();
        }
        const passwordHash = await hash(args.password, {
            salt: Buffer.from(args.email)
        });
        const user = this.services.usersRepository.create({
            ...args,
            password: passwordHash
        });
        const userInDb = await this.services.usersRepository.save(user);
        await this.createDefaultPlaylist(userInDb.idUser);
        return fulfillUser(userInDb);
    }
    
    private async createDefaultPlaylist(user_id: number)
    {
        const default_playlist = this.services.playlistsRepository.create({  
            title: "UPLOADED_SONGS",
            description: "Songs upload by user " + user_id,
            visibility: "private",
            released_on: new Date().getUTCFullYear(),
            creator_fk: user_id
        });
        await this.services.playlistsRepository.savePlaylist(default_playlist);
        return default_playlist;
    }
}