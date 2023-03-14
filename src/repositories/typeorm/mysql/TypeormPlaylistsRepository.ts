import { EntityManager, Repository } from "typeorm";
import { APIErrors, DuplicateSongEntryError } from "../../../api/APIErrors";
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

    async findById(idPlaylist: number) {
        const playlist = await this.findOneBy({ idPlaylist });
        return playlist;
    },

    async findManyById(ids: number[]) {
        const idsInObj = ids.map(id => ({ id }));
        const playlists = await this.find({ 
            where: ids.map(id => ({ idPlaylist: id }))
        });
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
            SELECT idSong, songs.title AS song_title, songs.file_path
            FROM playlists
            INNER JOIN songs_playlists AS sp ON sp.playlist_id=idPlaylist
            INNER JOIN songs ON idSong=sp.song_id
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
                        ${playlist.visibility ? `"${playlist.visibility}"` : `"private"`},
                        ${playlist.released_on ?? new Date().getUTCFullYear},
                        ${playlist.path_featured_picture ? `"${playlist.path_featured_picture}"` : "NULL" },
                        ${playlist.creator_fk}
                    )
                `);

                await manager.query(`
                    INSERT INTO playlists_users(playlist_id, user_id) VALUES (${playlistInDb.insertId}, ${playlist.creator_fk})
                `);

                return playlistInDb.insertId;
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
                SELECT idPlaylist, playlists.title AS playlist_title, description, visibility, released_on, path_featured_picture, playlists.creator_fk, playlists.created_at, playlists.updated_at, songs.idSong AS songs_id
                FROM playlists
                INNER JOIN songs_playlists AS sp ON sp.playlist_id=${playlist_to_copy}
                INNER JOIN songs ON idSong=sp.song_id
                WHERE idPlaylist=${playlist_to_copy}
            `);

            const songs_ids = playlist.map((p: any)=> p.songs_id);

            const copyPlaylist = await manager.query(`
                INSERT INTO playlists(title, description, visibility, released_on, path_featured_picture, creator_fk) VALUES(
                    "${playlist[0].playlist_title}",
                    ${playlist[0].description ? `"${playlist[0].description}"` : `NULL`},
                    ${playlist[0].visibility ? `"${playlist[0].visibility}"` : `"private"`},
                    ${playlist[0].released_on ?? `${new Date().getUTCFullYear()}`},
                    ${playlist[0].path_featured_picture ? `"${playlist[0].path_featured_picture}"` : `NULL`},
                    ${copy_owner_id}
                )
            `);

            const promises = songs_ids.map((song_id: number) => {
                const p = manager.query(`
                    INSERT INTO songs_playlists(song_id, playlist_id) VALUES(
                        ${song_id},
                        ${copyPlaylist.insertId}
                    )
                `)

                return p;
            });

            const copyPlaylistUserRel = manager.query(`
                    INSERT INTO playlists_users(playlist_id, user_id) VALUES(${copyPlaylist.insertId}, ${copy_owner_id})
            `);

            await Promise.all([ ...promises, copyPlaylistUserRel ]);
    
            return copyPlaylist;
        });

        return result;
    },

    async findPlaylistsByUser(user_id: number) {
        const playlists = await this.query(`
            SELECT idPlaylist, users.idUser, title, path_featured_picture, visibility, description, released_on, playlists.created_at, playlists.updated_at, creator_fk
            FROM users
            INNER JOIN playlists_users AS pu ON idUser=pu.user_id
            INNER JOIN playlists ON pu.playlist_id=playlists.idPlaylist
            WHERE idUser=${user_id}
        `);

        return playlists;
    },

    async addSongToPlaylist(playlist_id: number, song_id: number) {
        await this.manager.transaction(async (manager: EntityManager) => {
            const spInsert = manager.query(`
                INSERT INTO songs_playlists(playlist_id, song_id) VALUES(${playlist_id}, ${song_id})
            `);

            const playlistsUpdate = manager.query(`
                UPDATE playlists
                SET updated_at=NOW()
                WHERE idPlaylist=${playlist_id}
            `);

            await Promise.all([ spInsert, playlistsUpdate ]);
        });
    },

    async deletePlaylist(playlist_id: number) {
        await this.manager.transaction(async (manager: EntityManager) => {
            await manager.delete(Playlist, { id: playlist_id });
        });
    },

    async findFamousPlaylists(limit: number) {
        const playlists = await this.query(`
            SELECT idPlaylist, title, visibility, creator_fk, created_at, updated_at
            FROM playlists
            WHERE playlists.visibility="public"
            ORDER BY RAND()
            LIMIT ${limit ?? 10}
        `);

        return playlists;
    },

    async removeSongFromPlaylist(song_id: number, playlist_id: number) {
        await this.query(`
            DELETE 
            FROM songs_playlists
            WHERE songs_playlists.song_id=${song_id} AND songs_playlists.playlist_id=${playlist_id}
        `);
    }
});