import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository, PartialPlaylist } from "../../../repositories/PlaylistsRepository";
import { IUploadFeaturedImgPlaylistDTO } from "./UploadFeaturedImgPlaylistDTO";

export class UploadFeaturedImgPlaylist {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ playlist_id, requester_id, path_featured_picture }: IUploadFeaturedImgPlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if((playlist.creator_fk !== requester_id) || !playlist) {
            throw new UnauthorizedRequestError();
        }
        await this.playlistsRepository.updateFeaturedPicturePath(playlist_id, path_featured_picture);
        return {
            ...playlist,
            path_featured_picture
        } as PartialPlaylist;
    }
}