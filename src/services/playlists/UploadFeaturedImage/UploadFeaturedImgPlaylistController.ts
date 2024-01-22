import { Request, Response } from "express";
import { Playlist } from "../../../entities/Playlist";
import { IUploadFeaturedImgPlaylistDTO } from "./UploadFeaturedImgPlaylistDTO";
import { PartialPlaylist } from "../../../repositories/PlaylistsRepository";

interface IUploadFeaturedImgPlaylistService {
    execute(args: IUploadFeaturedImgPlaylistDTO): Promise<PartialPlaylist>;
}

export class UploadFeaturedImgPlaylistController {
    constructor(
        private service: IUploadFeaturedImgPlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const { file_props: { file_name }, user_id } = req;
        const { id } = req.params;
        const playlist = await this.service.execute({ 
            path_featured_picture: file_name, 
            playlist_id: Number(id), 
            requester_id: Number(user_id) 
        });
        return res.json(playlist);
    }
}