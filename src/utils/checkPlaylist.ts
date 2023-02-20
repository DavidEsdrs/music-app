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