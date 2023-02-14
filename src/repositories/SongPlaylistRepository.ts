import { SongPlaylist } from "../entities/SongPlaylist";
import { GenericRepository } from "./GenericRepository";

export interface ISongPlaylistRepository extends GenericRepository<SongPlaylist> {}