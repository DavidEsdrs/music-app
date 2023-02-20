import { Request, Response } from "express";
import { Playlist } from "../../../entities/Playlist";
import { IGetPlaylistDTO } from "./GetPlaylistDTO";

interface IGetPlaylistService {
    execute(args: IGetPlaylistDTO): Promise<Playlist>;
}

export class GetPlaylistController {
    constructor(
        private service: IGetPlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const playlist_id = Number(req.params.id);
        const { user_id } = req;
        const playlist = await this.service.execute({ playlist_id, user_id });
        return res.json(playlist);
    }
}