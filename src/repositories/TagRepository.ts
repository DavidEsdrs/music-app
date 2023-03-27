import { Playlist } from "../entities/Playlist";
import { Song } from "../entities/Song";
import { Tag } from "../entities/Tag";
import { GenericRepository } from "./GenericRepository";

export type SongAndPlaylist = {
    songs: Song[];
    playlists: Playlist[];
};

/*
    Got from: https://stackoverflow.com/a/70387184
*/
type ObjectWithPrefix<T, P extends string> = {
    [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
}

type SongWithPrefix = ObjectWithPrefix<Song, "song_">;
type TagWithPrefix = ObjectWithPrefix<Tag, "tag_">;
type PlaylistWithPrefix = ObjectWithPrefix<Playlist, "playlist_">;

type TagPlaylistJoin = TagWithPrefix & PlaylistWithPrefix;

type TagSongJoin = TagWithPrefix & SongWithPrefix;

export interface TagSongOrPlaylist {
    songs: TagSongJoin[],
    playlists: TagPlaylistJoin[]
}

type TagCount = Tag & { quantity: number; };

export interface ITagRepository extends GenericRepository<Tag> {
    findByName(name: string): Promise<Tag>;
    findSongAndPlaylistByTag(tag: string, limit: number): Promise<SongAndPlaylist>;
    findSongAndPlaylistByTags(tags: string[], limit: number): Promise<TagSongOrPlaylist>;
    getTagsFromSong(song_id: number): Promise<Tag[]>;
    countTagByUsage(tags: Tag[]): Promise<TagCount[]>;
}