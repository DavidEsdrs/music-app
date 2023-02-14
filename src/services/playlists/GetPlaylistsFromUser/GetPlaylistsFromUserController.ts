import { Request, Response } from "express";
import { Playlist } from "../../../entities/Playlist";
import { IGetPlaylistsFromUserDTO } from "./GetPlaylistsFromUserDTO";

interface IGetPlaylistsFromUserService {
    execute(args: IGetPlaylistsFromUserDTO): Promise<Playlist[]>;
}

export class GetPlaylistsFromUserController {
    constructor(
        private service: IGetPlaylistsFromUserService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id: requester_id } = req;
        const user_id = Number(req.params.user_id);
        const playlists = await this.service.execute({ requester_id, user_id });
        return res.json(playlists);
    }
}