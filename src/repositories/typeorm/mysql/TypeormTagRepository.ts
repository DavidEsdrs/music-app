import { Tag } from "../../../entities/Tag";
import AppDataSource from "../../../ormconfig";
import { SongAndPlaylist } from "../../TagRepository";

export const TypeormTagRepository = AppDataSource.getRepository(Tag).extend({
    async findById(idTag: number) {
        const tag = await this.findOneBy({ idTag });
        return tag;
    },

    async findByName(name: string) {
        const tag = await this.findOneBy({ name });
        return tag;
    },

    async findSongAndPlaylistByTag(tag: string, limit: number = 20) {
        const songsAndPlaylists = await this.query(`
            SELECT 
                t.idTag, 
                t.name, 
                t.created_at, 
                t.updated_at, 
                p.idPlaylist, 
                p.title playlist_title, 
                p.description playlist_description, 
                p.visibility playlist_visibility, 
                p.path_featured_picture, 
                p.released_on, 
                p.created_at playlist_created_on, 
                p.updated_at playlist_updated_at, 
                p.creator_fk playlist_creator_fk, 
                s.idSong, 
                s.title song_title, 
                s.file_path,
                s.created_at song_created_at, 
                s.updated_at song_updated_at, 
                s.creator_fk song_creator_fk
            FROM tags t
            LEFT JOIN playlists p ON t.playlist_id=p.idPlaylist
            LEFT JOIN songs s ON t.song_id=s.idSong
            WHERE t.name=?
            LIMIT ?
        `, [tag, limit]);
        const sps: SongAndPlaylist = {
            songs: [],
            playlists: []
        };
        songsAndPlaylists.forEach((sp: any) => sp.idSong ? sps.songs.push(sp) : sps.playlists.push(sp));
        return sps;
    }
});