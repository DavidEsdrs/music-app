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
        const { user_id } = req;
        const { 
            title,
            visibility,
            path_featured_picture,
            released_on,
            creator_fk
        } = req.body;
        const playlist = await this.service.execute({ title, visibility, path_featured_picture, released_on, creator_fk: Number(user_id) });
        return res.json(playlist);
    }
}