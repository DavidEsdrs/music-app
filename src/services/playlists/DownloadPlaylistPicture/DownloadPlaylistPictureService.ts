import path from "path";
import fs from "fs";
import { PlaylistsNotFoundError } from "../../../api/APIErrors";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IDownloadPlaylistPictureDTO } from "./DownloadPlaylistPictureDTO";

export class DownloadPlaylistPictureService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ user_id, playlist_id }: IDownloadPlaylistPictureDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if(playlist.creator_fk !== user_id && playlist.visibility !== "public") {
            throw new PlaylistsNotFoundError();
        }
        if(!playlist.path_featured_picture) {
            return null;
        }
        const downloadPath = path.resolve(__dirname, "..", "..", "..", "..", "uploads", "playlists", playlist.path_featured_picture);
        const readableStream = fs.createReadStream(downloadPath, { highWaterMark: 1024 });
        return readableStream;
    }
}