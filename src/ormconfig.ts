import { DataSource } from "typeorm"
import dotenv from "dotenv";
import { User } from "./entities/User";
import { Playlist } from "./entities/Playlist";
import { Song } from "./entities/Song";
import { createUsersTable1676253240773 } from "./migrations/1676253240773-create_users_table";
import { createPlaylistsTable1676253797294 } from "./migrations/1676253797294-create_playlists_table";
import { createSongsTable1676254244943 } from "./migrations/1676254244943-create_songs_table";
import { createUsersPlaylistsJoinTable1676254515226 } from "./migrations/1676254515226-create_users_playlists_join_table";
import { createPlaylistsSongsJoinTable1676255656167 } from "./migrations/1676255656167-create_playlists_songs_join_table";
import { createSongsUsersJoinTable1676255861532 } from "./migrations/1676255861532-create_songs_users_join_table";
import { PlaylistUser } from "./entities/PlaylistUser";
import { SongPlaylist } from "./entities/SongPlaylist";
import { SongUser } from "./entities/SongUser";
import { createRefreshTokenTable1678476984531 } from "./migrations/1678476984531-create_refresh_token_table";
import { RefreshToken } from "./entities/RefreshToken";
import { TagPlaylist, TagSong } from "./entities/Tag";
import { createTagsTable1678890947949 } from "./migrations/1678890947949-create_tags_table";

dotenv.config({
    path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.production"
});

const AppDataSource = new DataSource({
    type: "mysql",
    url: process.env.DATABASE_URL,
    entities: [
        User,
        Playlist,
        Song,
        PlaylistUser,
        SongPlaylist,
        SongUser,
        RefreshToken,
        TagPlaylist, 
        TagSong
    ],
    migrations: [
        createUsersTable1676253240773,
        createPlaylistsTable1676253797294,
        createSongsTable1676254244943,
        createUsersPlaylistsJoinTable1676254515226,
        createPlaylistsSongsJoinTable1676255656167,
        createSongsUsersJoinTable1676255861532,
        createRefreshTokenTable1678476984531,
        createTagsTable1678890947949
    ]
});

AppDataSource.initialize()
    .then((manager) => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export default AppDataSource;