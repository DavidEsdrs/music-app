import { Request, Response } from "express";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IDeletePlaylistDTO } from "./DeletePlaylistDTO";

interface IDeletePlaylistService {
    execute(args: IDeletePlaylistDTO): Promise<ResponseEntity<Playlist>>
}

export class DeletePlaylistsController {
    constructor(
        private service: IDeletePlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const playlist_id = Number(req.params.playlist_id);
        const { user_id: requester_id } = req;
        const result = await this.service.execute({ playlist_id, requester_id });
        return res.json(result);
    }
}