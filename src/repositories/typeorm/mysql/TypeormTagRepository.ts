import { Playlist } from "../../../entities/Playlist";
import { Song } from "../../../entities/Song";
import { Tag } from "../../../entities/Tag";
import AppDataSource from "../../../ormconfig";
import { SongAndPlaylist, TagSongOrPlaylist } from "../../TagRepository";



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
    },
    async findSongAndPlaylistByTags(tags: string[], limit: number = 10) {
        const songsAndPlaylists = await this.
            createQueryBuilder("tag").
            leftJoinAndSelect("playlists", "playlist", "tag.playlist_id=playlist.idPlaylist").
            leftJoinAndSelect("songs", "song", "tag.song_id=song.idSong").
            where("tag.name IN (:...tags)", { tags }).
            limit(limit).
            getRawMany();

        const sps: TagSongOrPlaylist = {
            songs: [],
            playlists: []
        };
        
        songsAndPlaylists.forEach((sp: any) => sp.song_idSong ? sps.songs.push(sp) : sps.playlists.push(sp));
        return sps;
    },

    async getTagsFromSong(song_id: number) {
        const tagsFromSong = await this.query(`
            SELECT *
            FROM tags t
            WHERE t.song_id=?
        `, [song_id]);
        return tagsFromSong;
    },

    async countTagByUsage(tags: Tag[]) {
        const tagsCount = await this.
            createQueryBuilder("t").
            select("t.name", "name").
            addSelect("t.type", "type").
            addSelect("COUNT(*)", "quantity").
            where("t.name IN (:...tags)", { tags: tags.map(t => t.name) }).
            groupBy("t.name").
            addGroupBy("t.type").
            orderBy("quantity", "DESC").
            getRawMany();
        return tagsCount.map(t => ({ ...t, quantity: Number(t.quantity) }));
    }
});

export { TagSongOrPlaylist };
