import { PlaylistUser } from "../../../entities/PlaylistUser";
import AppDataSource from "../../../ormconfig";

export const typeormPlaylistUserRepository = AppDataSource.getRepository(PlaylistUser).extend({
    async findById(id: number) {
        const playlistUser = await this.findOneBy({ id });
        return playlistUser;
    }
});