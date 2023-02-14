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
        const playlist = await this.service.execute({
            ...body,
            creator_fk: user_id
        });
        return res.json(playlist);
    }
}