import { DataSource } from "typeorm"
import dotenv from "dotenv";
import { createUsersTable1676058796952 } from "./migrations/1676058796952-create_users_table";
import { User } from "./entities/User";

dotenv.config({
    path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.production"
});

const AppDataSource = new DataSource({
    type: "mysql",
    url: process.env.DATABASE_URL,
    entities: [
        User
    ],
    migrations: [
        createUsersTable1676058796952
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