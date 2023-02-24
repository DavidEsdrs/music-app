import { Playlist } from "../entities/Playlist";

export const checkPlaylist = (playlist: Playlist, requester_id: number) => {
    if(!playlist) {
        return false;
    }
    if(playlist.creator_fk !== requester_id && playlist.visibility !== "public") {
        return false;
    }
    return true;
}

export const isPublicSong = (song_playlists: Partial<Playlist>[]) => {
    const visibilities = song_playlists.map(sp => sp.visibility);
    const public_playlists = visibilities.filter(v => v === "public");
    if(public_playlists.length <= 0) {
        return false;
    }
    return true;
}