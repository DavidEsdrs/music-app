import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IGetSongsFromPlaylistDTO } from "./GetSongsFromPlaylistDTO";

export class GetSongsFromPlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ user_id, playlist_id }: IGetSongsFromPlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if(playlist.creator_fk !== user_id && playlist.visibility !== "public") {
            throw new UnauthorizedRequestError();
        }
        const songs = await this.playlistsRepository.findSongsByPlaylist(playlist_id);
        const songsWithDownloadLink = songs.map(song => ({ 
            ...song, 
            download_link: `${process.env.API_URL}/song/${song.id}/download`, 
            file_path: undefined
        }));
        return songsWithDownloadLink;
    }
}