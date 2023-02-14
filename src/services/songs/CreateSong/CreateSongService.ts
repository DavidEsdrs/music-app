import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IPlaylistUserRepository } from "../../../repositories/PlaylistUserRepository";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { ISongUserRepository } from "../../../repositories/SongUserRepository";
import { IAddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistController";
import { ICreateSongDTO } from "./CreateSongDTO";

type CreateSongServiceArgs = {
    songsRepository: ISongsRepository,
    songUserRepository: ISongUserRepository,
    playlistsRepository: IPlaylistsRepository,
    playlistUserRepository: IPlaylistUserRepository,
    addSongToPlaylist: IAddSongToPlaylistService
}

export class CreateSongService {
    constructor(
        private services: CreateSongServiceArgs
    ) {}

    async execute(args: ICreateSongDTO) {
        const song = this.services.songsRepository.create(args.song);
        const songSaved = await this.services.songsRepository.save(song);
        const songUserRelation = this.services.songUserRepository.create({
            song_id: songSaved.id,
            user_id: songSaved.creator_fk
        });
        await this.services.songUserRepository.save(songUserRelation);
        await this.saveSongInDefaultPlaylist(args.song.creator_fk, songSaved.id);
        return song;
    }
    
    private async saveSongInDefaultPlaylist(user_id: number, song_id: number)
    {
        const default_playlist = await this.services.playlistsRepository.findDefaultPlaylist(user_id);
        await this.services.addSongToPlaylist.execute({ playlist_id: default_playlist.id, song_id, user_id });
    }
}