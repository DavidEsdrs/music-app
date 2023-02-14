import { Song } from "../entities/Song";
import { GenericRepository } from "./GenericRepository";

export interface ISongsRepository extends GenericRepository<Song> {}