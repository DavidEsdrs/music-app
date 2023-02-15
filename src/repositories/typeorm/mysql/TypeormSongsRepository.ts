import { EntityManager } from "typeorm";
import { APIErrors } from "../../../api/APIErrors";
import { Song } from "../../../entities/Song";
import AppDataSource from "../../../ormconfig";

export const songsRepository = AppDataSource.getRepository(Song).extend({
    async findById(id: number) {
        const song = await this.findOneBy({ id });
        return song;
    },

    async saveRelationUserSong(user_id: number, song_id: number) {
        const userSongRel = await this.query(`
            INSERT INTO songs_users(user_id, song_id) VALUES (${user_id}, ${song_id})
        `);
        return userSongRel;
    },

    async saveSong(song_partial: Partial<Song>) {
        const insertSong = await this.manager.transaction(async (manager: EntityManager) => {
            try {
                const songInDb = await manager.query(`
                    INSERT INTO songs(idSong, title, file_path, creator_fk) 
                    VALUES(NULL, "${song_partial.title}", "${song_partial.file_path}", ${song_partial.creator_fk})
                `);

                const song = (await manager.query(`
                    SELECT idSong AS id, songs.title, 
                    FROM songs 
                    WHERE idSong=${songInDb.insertId}
                `))[0];

                await manager.query(`
                    INSERT INTO songs_users(user_id, song_id) VALUES (${song.creator_fk}, ${song.idSong})
                `);

                const default_playlist = (await manager.query(`
                    SELECT idPlaylist
                    FROM playlists
                    WHERE playlists.creator_fk=${song_partial.creator_fk} AND playlists.title="UPLOADED_SONGS"
                `))[0];

                await manager.query(`
                    INSERT INTO songs_playlists(playlist_id, song_id) VALUES(${default_playlist.idPlaylist}, ${song.idSong})
                `);

                return song;
            }

            catch(err) {
                throw new APIErrors(400, "The insert query is invalid!");
            }
        });

        return insertSong;
    },

    async isPublicSong(song_id: number) {
        const songs = await this.query(`
            SELECT sp.playlist_id
            FROM songs
            INNER JOIN users ON songs.creator_fk=users.idUser
            INNER JOIN songs_playlists AS sp ON songs.idSong=sp.song_id
            INNER JOIN playlists ON sp.playlist_id=playlists.idPlaylist
            WHERE idSong=${song_id} AND playlists.visibility="public";
        `);

        return !!songs;
    },
});