import { Playlist } from "../entities/Playlist";
import { Song } from "../entities/Song";
import { TagPlaylist, TagSong } from "../entities/Tag";
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
type TagWithPrefix = ObjectWithPrefix<TagPlaylist, "tag_">;
type PlaylistWithPrefix = ObjectWithPrefix<Playlist, "playlist_">;

type TagPlaylistJoin = TagWithPrefix & PlaylistWithPrefix;

type TagSongJoin = TagWithPrefix & SongWithPrefix;

export interface TagSongOrPlaylist {
    songs: TagSongJoin[],
    playlists: TagPlaylistJoin[]
}

type TagCount = TagPlaylist & { quantity: number; };

export interface ITagPlaylistRepository extends GenericRepository<TagPlaylist> {
    findByName(name: string): Promise<TagPlaylist>;
    findSongAndPlaylistByTags(tags: string[], limit: number): Promise<TagSongOrPlaylist>;
    getTagsFromSong(song_id: number): Promise<TagPlaylist[]>;
    countTagByUsage(tags: TagPlaylist[]): Promise<TagCount[]>;
}

export interface ITagSongRepository extends GenericRepository<TagSong> {
    findByName(name: string): Promise<TagSong>;
    findSongAndPlaylistByTags(tags: string[], limit: number): Promise<TagSongOrPlaylist>;
    getTagsFromSong(song_id: number): Promise<TagSong[]>;
    countTagByUsage(tags: TagSong[]): Promise<TagCount[]>;
}