import { EntityManager } from "typeorm";
import { APIErrors, SongNotFoundError, UnauthorizedRequestError } from "../../../api/APIErrors";
import { Song } from "../../../entities/Song";
import AppDataSource from "../../../ormconfig";
import { SongJoin } from "../../SongsRepository";

export const songsRepository = AppDataSource.getRepository(Song).extend({
    async findById(idSong: number) {
        const song = await this.findOneBy({ idSong });
        return song;
    },

    async saveRelationUserSong(user_id: number, song_id: number) {
        const userSongRel = await this.query(`
            INSERT INTO songs_users(user_id, song_id) VALUES (?, ?)
        `, [user_id, song_id]);
        return userSongRel;
    },

    async saveSong(song_partial: Partial<Song>) {
        const insertSong = await this.manager.transaction(async (manager: EntityManager) => {
            try {
                const songInDb = await manager.query(`
                    INSERT INTO songs(idSong, title, file_path, creator_fk) 
                    VALUES(NULL, ?, ?, ?)
                `, [song_partial.title, song_partial.file_path, song_partial.creator_fk]);

                await manager.query(`
                    INSERT INTO songs_users(user_id, song_id) VALUES (?, ?)
                `, [song_partial.creator_fk, songInDb.insertId]);

                const default_playlist = (await manager.query(`
                    SELECT idPlaylist
                    FROM playlists
                    WHERE playlists.creator_fk=? AND playlists.title="UPLOADED_SONGS"
                `, [song_partial.creator_fk]))[0];

                await manager.query(`
                    INSERT INTO songs_playlists(playlist_id, song_id) VALUES(?, ?)
                `, [default_playlist.idPlaylist, songInDb.insertId]);

                return songInDb.insertId;
            }

            catch(err) {
                throw new APIErrors(400, "The insert query is invalid!");
            }
        });

        return insertSong;
    },

    async joinSongPlaylistUser(song_id: number) {
        const song = await this.query(`
            SELECT idSong, songs.title AS song_title, users.idUser, playlists.idPlaylist, playlists.title AS playlist_title, playlists.visibility, file_path
            FROM songs
            INNER JOIN users ON songs.creator_fk=users.idUser
            INNER JOIN songs_playlists AS sp ON songs.idSong=sp.song_id
            INNER JOIN playlists ON sp.playlist_id=playlists.idPlaylist
            WHERE idSong=?
        `, [song_id]);

        if(song.length <= 0) {
            throw new UnauthorizedRequestError();
        }

        const song_join: SongJoin = {
            idSong: song[0].idSong,
            creator_fk: song[0].idUser,
            title: song[0].song_title,
            file_path: song[0].file_path,
            playlists: song.map((s: any) => ({ idPlaylist: s.idPlaylist, title: s.playlist_title, visibility: s.visibility }))
        };

        return song_join;
    },

    async joinSongPublicPlaylists(song_id: number) {
        const song = await this.query(`
            SELECT s.idSong idSong, s.title song_title, s.file_path, s.creator_fk creator_fk, p.idPlaylist, p.visibility, p.title playlist_title, p.creator_fk playlist_creator_fk, p.created_at playlist_created_at
            FROM songs s
            INNER JOIN songs_playlists sp ON s.idSong=sp.song_id
            INNER JOIN playlists p ON sp.playlist_id=p.idPlaylist
            WHERE s.idSong=? AND p.creator_fk=s.creator_fk;
        `, [song_id]);

        if(song.length <= 0) {
            throw new SongNotFoundError();
        }

        const song_join: SongJoin = {
            idSong: song[0].idSong,
            creator_fk: song[0].creator_fk,
            title: song[0].song_title,
            file_path: song[0].file_path,
            playlists: song.map((s: any) => ({ idPlaylist: s.idPlaylist, title: s.playlist_title, visibility: s.visibility, creator_fk: s.playlist_creator_fk, created_at: s.playlist_created_at  }))
        };

        return song_join;
    },

    async isPublicSong(song_id: number) {
        const song = await this.query(`
            SELECT COUNT(*) AS count
            FROM songs
            INNER JOIN songs_playlists AS sp ON songs.idSong=sp.song_id
            INNER JOIN playlists AS p ON p.idPlaylist=sp.playlist_id
            WHERE songs.idSong=? AND p.visibility = "public";
        `, [song_id]);

        return Number(song[0].count) > 0;
    },

    async deleteSong(id: number) {
        await this.query(`
            DELETE
            FROM songs 
            WHERE idSong=?
        `, [id]);
    }
});