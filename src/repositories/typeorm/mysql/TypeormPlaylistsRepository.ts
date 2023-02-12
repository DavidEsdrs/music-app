import { Playlist } from "../../../entities/Playlist";
import AppDataSource from "../../../ormconfig";

export const TypeormPlaylistsRepository = AppDataSource.getRepository(Playlist).extend({
    async savePlaylist(args: Playlist) {
        await this.query(`
            INSERT INTO playlists(idPlaylist, title, description, path_featured_picture, released_on, creator_fk) VALUES(
                NULL,
                "${args.title}",
                ${args.description ? `"${args.description}"` : `NULL`},
                ${args.path_featured_picture ? `"${args.path_featured_picture}"` : `NULL`},
                ${args.released_on ?? `NULL`},
                ${args.creator_fk}
            )
        `);
    },

    async findById(id: number) {
        const playlist = await this.query(`
            SELECT 
                idPlaylist AS id, 
                title, 
                path_featured_picture, 
                visibility, 
                description, 
                creator_fk, 
                released_on, 
                playlists.created_at, 
                playlists.updated_at
            FROM playlists
            INNER JOIN users ON playlists.creator_fk=users.id
            WHERE idPLaylist=${id}
        `);
        return playlist[0];
    },

    async updateFeaturedPicturePath(id: number, path_featured_picture: string) {
        await this.query(`
            UPDATE playlists
            SET path_featured_picture="${path_featured_picture}"
            WHERE idPLaylist=${id}
        `);
    }
});