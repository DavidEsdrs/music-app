import { Request, Response } from "express";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IDeletePlaylistDTO } from "./DeletePlaylistDTO";

interface IDeletePlaylistService {
    execute(args: IDeletePlaylistDTO): Promise<ResponseEntity<Playlist>>
}

export class DeletePlaylistController {
    constructor(
        private service: IDeletePlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const playlist_id = Number(req.params.id);
        const { user_id } = req;
        const response = await this.service.execute({ playlist_id, user_id });
        return res.json(response);
    }
}