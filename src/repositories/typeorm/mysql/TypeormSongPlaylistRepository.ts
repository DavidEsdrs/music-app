import { SongPlaylist } from "../../../entities/SongPlaylist";
import AppDataSource from "../../../ormconfig";

export const typeormSongPlaylistsRepository = AppDataSource.getRepository(SongPlaylist).extend({
    async findById(id: number) {
        const songPlaylist = await this.findOneBy({ id });
        return songPlaylist;
    }
});