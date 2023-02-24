import { Request, Response } from "express";
import { Playlist } from "../../../entities/Playlist";
import { IGetPlaylistsDTO } from "./GetPlaylistsDTO";

interface IGetPlaylistsService {
    execute(args: IGetPlaylistsDTO): Promise<Playlist[]>;
}

export class GetPlaylistsController {
    constructor(
        private service: IGetPlaylistsService
    ) {}

    async handle(req: Request, res: Response) {
        const limit = Number(req.query.limit);
        const playlists = await this.service.execute({ limit: 10 });
        return res.json(playlists);
    }
}