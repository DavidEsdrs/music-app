import { EntityManager, Repository } from "typeorm";
import { APIErrors } from "../../../api/APIErrors";
import { Playlist } from "../../../entities/Playlist";
import { PlaylistUser } from "../../../entities/PlaylistUser";
import { SongPlaylist } from "../../../entities/SongPlaylist";
import AppDataSource from "../../../ormconfig";

export const TypeormPlaylistsRepository = AppDataSource.getRepository(Playlist).extend({
    async saveMany(rels: SongPlaylist[]) {
        const INSERT_INTO = `
        INSERT INTO 
            songs_playlists(song_id, playlist_id) 
        VALUES`;
        const VALUES_ARRAY = rels.map((r, i) => (`(${r.song_id}, ${r.playlist_id})${i !== rels.length - 1 ? "," : ""}`));
        let VALUES = "";
        for(let i = 0; i < VALUES_ARRAY.length; i++) {
            VALUES += VALUES_ARRAY[i];
        }
        const QUERY = `${INSERT_INTO}${VALUES}`;
        const savedRels = this.query(QUERY);
        return savedRels;
    },

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
        const playlist = await this.query(`
            SELECT idPlaylist AS id, title, visibility, description, released_on, path_featured_picture, created_at, updated_at
            FROM playlists
            WHERE idPlaylist=${creator_fk} AND title="UPLOADED_SONGS"
        `);
        return playlist;
    },

    async findSongsByPlaylist(id: number) {
        const q = await this.query(`
            SELECT songs.idSong AS id, idPlaylist AS playlist_id, songs.title AS song_title, songs.file_path AS file_path, songs.created_at AS created_at, songs.updated_at AS updated_at, songs.creator_fk AS song_creator_fk
            FROM playlists
            INNER JOIN songs_playlists AS sp ON idPlaylist=sp.playlist_id
            INNER JOIN songs ON sp.song_id=songs.idSong
            WHERE idPlaylist=${id}
        `);
        return q;
    },

    async savePlaylist(playlist: Partial<Playlist>) {
        const p = await this.manager.transaction(async (manager: EntityManager) => {
            try {
                const playlistInDb = await manager.query(`
                    INSERT INTO playlists(title, description, visibility, released_on, path_featured_picture, creator_fk) VALUES(
                        "${playlist.title}",
                        ${playlist.description ? `"${playlist.description}"` : "NULL"},
                        ${playlist.visibility ? `"${playlist.visibility}"` : "private"},
                        ${playlist.released_on ? playlist.released_on : new Date().getUTCFullYear},
                        ${playlist.path_featured_picture ? `"${playlist.path_featured_picture}"` : "NULL" },
                        ${playlist.creator_fk}
                    )
                `);
        
                await manager.query(`
                    INSERT INTO playlists_users(playlist_id, user_id) VALUES (${playlistInDb.insertId}, ${playlist.creator_fk})
                `);

                const insertedPlaylist = (await manager.query(`
                    SELECT idPlaylist AS id, title, description, released_on, path_featured_picture, creator_fk, created_at, updated_at
                    FROM playlists
                    WHERE idPlaylist=${playlistInDb.insertId}
                `))[0];
                
                return insertedPlaylist;
            }

            catch(err) {
                throw new APIErrors(400, "Some entriy value is invalid!");
            }
        });

        return p;
    },

    async copyAndSavePlaylist(playlist_to_copy: number, copy_owner_id: number) {

        const result = await this.manager.transaction(async (manager: EntityManager) => {
            const playlist = await manager.query(`
                SELECT idPlaylist, title, description, visibility, released_on, path_featured_picture, creator_fk, created_at, updated_at, songs.id AS songs_id
                FROM playlists
                INNER JOIN songs_playlists AS sp ON sp.playlist_id=${playlist_to_copy}
                INNER JOIN songs ON idSong=sp.song_id
                WHERE idPlaylist=${playlist_to_copy}
            `);
    
            const copyPlaylist: Playlist = await manager.query(`
                INSERT INTO playlists(title, description, visibility, released_on, path_featured_picture, creator_fk) VALUES(
                    ${playlist.title},
                    ${playlist.description ? `"${playlist.description}"` : `NULL`},
                    ${playlist.visibility ? `"${playlist.visibility}"` : `"private"`},
                    ${playlist.released_on ?? `${new Date().getUTCFullYear()}`},
                    ${playlist.path_featured_picture ? `"${playlist.path_featured_picture}"` : `NULL`},
                    ${copy_owner_id}
                )
            `);
    
            playlist.songs_id.forEach(async (song_id: number) => {
                await manager.query(`
                    INSERT INTO songs_playlists(song_id, playlist_id) VALUES(
                        ${song_id},
                        ${copyPlaylist.id}
                    )
                `);
            });
    
            const copyPlaylistUserRel: PlaylistUser = await manager.query(`
                    INSERT INTO playlists_users(playlist_id, user_id) VALUES(${copyPlaylist.id}, ${copy_owner_id})
            `);
    
            return copyPlaylist;
        });

        return result;
    },

    async findPlaylistsByUser(user_id: number) {
        const playlists = await this.query(`
            SELECT idPLaylist AS id, users.idUser, title, path_featured_picture, visibility, description, released_on, playlists.created_at, playlists.updated_at, creator_fk
            FROM users
            INNER JOIN playlists_users AS pu ON idUser=pu.user_id
            INNER JOIN playlists ON pu.playlist_id=playlists.idPlaylist
            WHERE idUser=${user_id}
        `);

        return playlists;
    },

    async addSongToPlaylist(playlist_id: number, song_id: number) {
        await this.query(`
            INSERT INTO songs_playlists(playlist_id, song_id) VALUES(${playlist_id}, ${song_id})
        `);
    }
});