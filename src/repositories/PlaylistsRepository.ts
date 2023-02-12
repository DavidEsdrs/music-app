import { Playlist } from "../entities/Playlist";

export type PartialPlaylist = Partial<Omit<Playlist, "creator_fk">> & { creator_fk: number };

export interface IPlaylistsRepository {
    create(args: PartialPlaylist): Playlist;
    savePlaylist(args: Playlist): Promise<void>;
    findById(id: number): Promise<PartialPlaylist>;
    updateFeaturedPicturePath(id: number, path_featured_picture: string): Promise<void>;
}