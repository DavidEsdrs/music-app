import { Request, Response } from "express";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IRemoveSongFromPlaylistDTO } from "./RemoveSongFromPlaylistDTO";

interface IRemoveSongFromPlaylistService {
    execute(args: IRemoveSongFromPlaylistDTO): Promise<ResponseEntity<Playlist>>;
}

export class RemoveSongFromPlaylistController {
    constructor(
        private service: IRemoveSongFromPlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const { playlist, song } = req.params;
        const { user_id } = req;
        const result = await this.service.execute({
            playlist_id: Number(playlist),
            song_id: Number(song),
            user_id
        });
        return res.status(result.status_code).json(result);
    }
}