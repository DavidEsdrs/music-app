import { Request, Response } from "express";
import { Playlist } from "../../../entities/Playlist";
import { ICreatePlaylistDTO } from "./CreatePlaylistDTO";

interface ICreatePlaylistService {
    execute(args: ICreatePlaylistDTO): Promise<Playlist>;
}

export class CreatePlaylistController {
    constructor(
        private service: ICreatePlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const body = req.body;
        const { user_id } = req;
        const path_featured_picture = req.file_props?.file_name;
        const playlist = await this.service.execute({
            ...body,
            released_on: req.body.released_on ?? new Date().getUTCFullYear(),
            creator_fk: user_id,
            path_featured_picture
        });
        return res.json(playlist);
    }
}