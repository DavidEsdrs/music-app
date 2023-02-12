import { createReadStream } from "fs";
import { resolve } from "path";
import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IGetFeaturedImgDTO } from "./GetFeaturedImgDTO";

export class GetFeaturedImgService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ requester_id, id }: IGetFeaturedImgDTO) {
        const playlist = await this.playlistsRepository.findById(id);
        // if(
        //     (playlist.creator_fk !== requester_id && playlist.visibility === "private") || 
        //     !playlist
        // ) {
        //     throw new UnauthorizedRequestError();
        // }
        const readbleStream = createReadStream(resolve(__dirname, "..", "..", "..", "..", "uploads", "playlists", playlist.path_featured_picture));
        return readbleStream;
    }
}