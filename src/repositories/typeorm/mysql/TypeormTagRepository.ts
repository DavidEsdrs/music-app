import { Playlist } from "../../../entities/Playlist";
import { Song } from "../../../entities/Song";
import { TagPlaylist, TagSong } from "../../../entities/Tag";
import AppDataSource from "../../../ormconfig";
import { SongAndPlaylist, TagSongOrPlaylist } from "../../TagRepository";

export const TypeormTagPlaylistRepository = AppDataSource.getRepository(TagPlaylist).extend({
    async findById(idPlaylistTag: number) {
        const tag = await this.findOneBy({ idPlaylistTag });
        return tag;
    },

    async findByName(name: string) {
        const tag = await this.findOneBy({ name });
        return tag;
    },

    async findPlaylistsByTag(tag: string, limit: number = 20) {
        const playlists = await this.query(`
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
            FROM playlist_tags t
            LEFT JOIN playlists p ON t.playlist_id=p.idPlaylist
            WHERE t.name=?
            LIMIT ?
        `, [tag, limit]);
        return playlists;
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
            FROM playlist_tags pt
            WHERE pt.song_id=?
        `, [song_id]);
        return tagsFromSong;
    },

    async countTagByUsage(tags: TagPlaylist[]) {
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

export const TypeormTagSongRepository = AppDataSource.getRepository(TagSong).extend({
    async findById(idSongTag: number) {
        const tag = await this.findOneBy({ idSongTag });
        return tag;
    },

    async findByName(name: string) {
        const tag = await this.findOneBy({ name });
        return tag;
    },

    async findPlaylistsByTag(tag: string, limit: number = 20) {
        const playlists = await this.query(`
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
            FROM song_tags t
            LEFT JOIN playlists p ON t.playlist_id=p.idPlaylist
            WHERE t.name=?
            LIMIT ?
        `, [tag, limit]);
        return playlists;
    },
    async findSongAndPlaylistByTags(tags: string[], limit: number = 10) {
        const tagSongRepository = AppDataSource.getRepository(TagSong);
        const tagPlaylistRepository = AppDataSource.getRepository(TagPlaylist);
    
        const songs = await tagSongRepository
            .createQueryBuilder("tagSong")
            .where("tagSong.name IN (:...tags)", { tags })
            .limit(limit)
            .getMany();
    
        const playlists = await tagPlaylistRepository
            .createQueryBuilder("tagPlaylist")
            .where("tagPlaylist.name IN (:...tags)", { tags })
            .limit(limit)
            .getMany();
    
        return { songs, playlists };
    },
    async findSongAndPlaylistByTag(tag: string, limit: number = 10) {
        const tagSongRepository = AppDataSource.getRepository(TagSong);
        const tagPlaylistRepository = AppDataSource.getRepository(TagPlaylist);
    
        const songs = await tagSongRepository
            .createQueryBuilder("tagSong")
            .where("tagSong.name = :tag", { tag })
            .limit(limit)
            .getMany();
    
        const playlists = await tagPlaylistRepository
            .createQueryBuilder("tagPlaylist")
            .where("tagPlaylist.name = :tag", { tag })
            .limit(limit)
            .getMany();
    
        return { songs, playlists };
    },
    async getTagsFromSong(song_id: number) {
        const tagsFromSong = await this.query(`
            SELECT *
            FROM song_tags t
            WHERE t.song_id=?
        `, [song_id]);
        return tagsFromSong;
    },

    async countTagByUsage(tags: TagSong[]) {
        const tagsCount = await this.
            createQueryBuilder("t").
            select("t.name", "name").
            addSelect("t.tag_type", "type").
            addSelect("COUNT(*)", "quantity").
            where("t.name IN (:...tags)", { tags: tags.map(t => t.name) }).
            groupBy("t.name").
            addGroupBy("t.tag_type").
            orderBy("quantity", "DESC").
            getRawMany();
        return tagsCount.map(t => ({ ...t, quantity: Number(t.quantity) }));
    }
});

export { TagSongOrPlaylist };
