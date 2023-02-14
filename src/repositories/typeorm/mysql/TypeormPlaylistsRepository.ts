import { Repository } from "typeorm";
import { Playlist } from "../../../entities/Playlist";
import AppDataSource from "../../../ormconfig";

export const TypeormPlaylistsRepository = AppDataSource.getRepository(Playlist).extend({
    async findById(id: number) {
        const playlist = await this.findOneBy({ id });
        return playlist;
    },

    async findManyById(ids: number[]) {
        const idsInObj = ids.map(id => ({ id }));
        const playlists = await this.find({ where: idsInObj });
        return playlists;
    },

    async findDefaultPlaylist(creator_fk: number) {
        const playlist = await this.findOne({
            where: { creator_fk, title: "UPLOADED_SONGS" }
        });
        return playlist;
    }
});