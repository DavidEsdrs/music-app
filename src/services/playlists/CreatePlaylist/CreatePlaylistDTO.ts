export interface ICreatePlaylistDTO {
    title: string;
    visibility?: "public" | "private";
    path_featured_picture?: string;
    released_on?: number;
    creator_fk: number;
}