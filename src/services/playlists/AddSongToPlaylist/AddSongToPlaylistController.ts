import { Request, Response } from "express";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { SongPlaylist } from "../../../entities/SongPlaylist";
import { IAddSongToPlaylistDTO } from "./AddSongToPlaylistDTO";

export interface IAddSongToPlaylistService {
    execute(args: IAddSongToPlaylistDTO): Promise<ResponseEntity<SongPlaylist>>;
}

export class AddSongToPlaylistController {
    constructor(
        private service: IAddSongToPlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const { song, playlist } = req.params;
        const { user_id } = req;
        const song_id = Number(song);
        const playlist_id = Number(playlist);
        const response = await this.service.execute({ song_id, playlist_id, user_id });
        return res.status(response.status_code).json(response);
    }
}