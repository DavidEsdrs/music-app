import { Request, Response } from "express";
import { Song } from "../../../entities/Song";
import { IGetSongDTO } from "./GetSongDTO";

interface IGetSongService {
    execute(args: IGetSongDTO): Promise<Song>;
}

export class GetSongController {
    constructor(
        private service: IGetSongService
    ) {}

    async handle(req: Request, res: Response) {
        const song_id = Number(req.params.id);
        const { user_id } = req;
        const song = await this.service.execute({ song_id, user_id });
        return res.json(song);
    }
}