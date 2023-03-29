import { TagPlaylist } from "../../../entities/Tag";

export interface ICreatePlaylistDTO {
    title: string;
    creator_fk: number;
    visibility?: string;
    description?: string;
    released_on?: number;
    path_featured_picture?: string;
    tags?: TagPlaylist[];
}