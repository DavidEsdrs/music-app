import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { Playlist } from "../../../entities/Playlist";
import { Song } from "../../../entities/Song";
import { User } from "../../../entities/User";
import { ISongsRepository, SongJoin } from "../../../repositories/SongsRepository";
import { isPublicSong } from "../../../utils/checkPlaylist";
import { FileHandling } from "../../../utils/fileHandling/FileHandling";
import { fulfillPlaylist, fulfillSong } from "../../../utils/fulfillInfo";
import { IGetSongDTO } from "./GetSongDTO";

export class GetSongService {
    constructor(
        private songsRepository: ISongsRepository,
        private fileHandling: FileHandling
    ) {}

    async execute({ song_id, user_id }: IGetSongDTO) {
        const song = await this.songsRepository.joinSongPublicPlaylists(song_id);
        if(!this.isRequesterCreator(song.creator_fk, user_id) && !isPublicSong(song.playlists)) {
            throw new UnauthorizedRequestError();
        }
        const playlists = this.getPlaylists(this.isRequesterCreator(song.creator_fk, user_id), song);
        const song_info = { ...song, playlists };
        return fulfillSong(song_info as Song, this.fileHandling);
    }

    private isRequesterCreator = (creator_fk: number, requester_id: number) => creator_fk === requester_id

    private getPlaylists(requesterIsCreator: boolean, song: SongJoin) {
        const playlists = requesterIsCreator ? song.playlists.map(fulfillPlaylist) : song.playlists.map(fulfillPlaylist).filter(p => p.visibility === "public");
        return playlists;
    }
}
