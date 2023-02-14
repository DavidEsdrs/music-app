import { PlaylistUser } from "../entities/PlaylistUser";
import { GenericRepository } from "./GenericRepository";

export interface IPlaylistUserRepository extends GenericRepository<PlaylistUser> {
    findBy(args: Partial<PlaylistUser>): Promise<PlaylistUser[]>;
}