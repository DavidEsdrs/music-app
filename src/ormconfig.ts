import { DataSource } from "typeorm"
import dotenv from "dotenv";
import { createUsersTable1676058796952 } from "./migrations/1676058796952-create_users_table";
import { User } from "./entities/User";
import { createPlaylistsTable1676100806799 } from "./migrations/1676100806799-create_playlists_table";
import { Playlist } from "./entities/Playlist";

dotenv.config({
    path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.production"
});

const AppDataSource = new DataSource({
    type: "mysql",
    url: process.env.DATABASE_URL,
    entities: [
        User,
        Playlist
    ],
    migrations: [
        createUsersTable1676058796952,
        createPlaylistsTable1676100806799
    ]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export default AppDataSource;