import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { SongPlaylist } from "../../../entities/SongPlaylist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { isPublicSong } from "../../../utils/checkPlaylist";
import { IAddSongToPlaylistDTO } from "./AddSongToPlaylistDTO";

export class AddSongToPlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository,
        private songsRepository: ISongsRepository
    ) {}

    async execute({ user_id, song_id, playlist_id }: IAddSongToPlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);

        if(playlist.creator_fk !== user_id) {
            console.log("Invalid playlist!");
            throw new UnauthorizedRequestError();
        }
        
        const song = await this.songsRepository.joinSongPlaylistUser(song_id);
        
        if(!this.isRequesterCreator(song.creator_fk, user_id)  && !isPublicSong(song.playlists)) {
            throw new UnauthorizedRequestError();
        }
        
        await this.playlistsRepository.addSongToPlaylist(playlist_id, song_id);
        const result = new ResponseEntity<SongPlaylist>("Song successfully added to playlist", 200);
        return result;
    }

    isRequesterCreator = (creator_fk: number, requester_id: number) => creator_fk === requester_id;
}