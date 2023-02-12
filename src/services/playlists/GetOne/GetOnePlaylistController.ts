import { Request, Response } from "express";
import { Playlist } from "../../../entities/Playlist";
import { PartialPlaylist } from "../../../repositories/PlaylistsRepository";
import { IGetOnePlaylistDTO } from "./GetOnePLaylistDTO";

interface IGetOneService {
    execute(args: IGetOnePlaylistDTO): Promise<PartialPlaylist>;
}

export class GetOnePlaylistController {
    constructor(
        private service: IGetOneService
    ) {}

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { user_id } = req;
        const playlist = await this.service.execute({ id: Number(id), requester_id: Number(user_id) });
        return res.json(playlist);
    }
}