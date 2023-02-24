import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { FileHandling } from "../../../utils/fileHandling/FileHandling";
import { fulfillSong } from "../../../utils/fulfillInfo";
import { SongWithDownloadLink } from "./GetSongsFromPlaylistController";
import { IGetSongsFromPlaylistDTO } from "./GetSongsFromPlaylistDTO";

export class GetSongsFromPlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository,
        private fileHandling: FileHandling
    ) {}

    async execute({ user_id, playlist_id }: IGetSongsFromPlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if(!this.isPlaylistCreator(playlist.creator_fk, user_id) && !this.isPublicPlaylist(playlist.visibility)) {
            throw new UnauthorizedRequestError();
        }
        const songs = await this.playlistsRepository.findSongsByPlaylist(playlist_id);
        const songsWithDownloadLink = songs.map(s => fulfillSong(s, this.fileHandling));
        return await Promise.all([ ...songsWithDownloadLink ]) as SongWithDownloadLink[];
    }

    private isPlaylistCreator = (playlist_creator: number, requester_id: number) => playlist_creator === requester_id;

    private isPublicPlaylist = (visibility: string) => visibility === "public";
}