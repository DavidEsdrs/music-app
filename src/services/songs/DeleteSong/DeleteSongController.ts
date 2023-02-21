import { Request, Response } from "express";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Song } from "../../../entities/Song";
import { IDeleteSongDTO } from "./DeleteSongDTO";

interface IDeleteSongService {
    execute(args: IDeleteSongDTO): Promise<ResponseEntity<Song>>;
}

export class DeleteSongController {
    constructor(
        private service: IDeleteSongService
    ) {}

    async handle(req: Request, res: Response) {
        const song_id = Number(req.params.id);
        const { user_id } = req;
        const result = await this.service.execute({ song_id, user_id });
        return res.json(result);
    }
}