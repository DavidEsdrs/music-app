import path from "path";
import { Playlist } from "../entities/Playlist";
import { Song } from "../entities/Song";
import { User } from "../entities/User";
import { SongWithDownloadLink } from "../services/songs/GetSongsFromPlaylist/GetSongsFromPlaylistController";
import { FileHandling } from "./fileHandling/FileHandling";

export const fulfillPlaylist = (playlist: Playlist) => ({ 
    ...playlist, 
    songs_url: `${process.env.API_URL}/playlist/${playlist.idPlaylist}/song`, 
    playlist_url: `${process.env.API_URL}/playlist/${playlist.idPlaylist}` 
}) as Playlist;

export const fulfillUser = (user: User) => ({ 
    ...user, 
    playlists_url: `${process.env.API_URL}/user/${user.idUser}/playlist`, 
    password: undefined 
}) as User;

export const fulfillSong = async (song: Song, fileHandling: FileHandling) => { 
    const duration = await fileHandling.getSongDuration(path.resolve(__dirname, "..", "..", "uploads", "songs", song.file_path));

    return {
        ...song, 
        download_link: `${process.env.API_URL}/song/${song.idSong}/stream`, 
        duration 
    } as SongWithDownloadLink
};