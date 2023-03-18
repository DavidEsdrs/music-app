import { Request, Response } from "express";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IUpdatePlaylistDTO } from "./IUpdatePlaylistDTO";

interface IUpdatePlaylistService {
    execute(args: IUpdatePlaylistDTO): Promise<ResponseEntity<Playlist>>;
}

export class UpdatePlaylistController {
    constructor(
        private service: IUpdatePlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const { file_props } = req;
        const playlist_id = Number(req.params.id);
        const partial_playlist = req.body;
        const response = await this.service.execute({ 
            partial_playlist: {
                ...partial_playlist,
                path_featured_picture: file_props?.file_name
            }, 
            playlist_id, 
            user_id 
        });
        return res.json(response);
    }
}