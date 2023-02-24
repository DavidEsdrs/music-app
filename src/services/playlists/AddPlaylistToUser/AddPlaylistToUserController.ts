import { Request, Response } from "express";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { InsertEntity } from "../../../utils/InsertEntity";
import { IAddPlaylistToUserDTO } from "./AddPlaylistToUserDTO";

interface IAddPlaylistToUserService {
    execute(args: IAddPlaylistToUserDTO): Promise<ResponseEntity<InsertEntity<Playlist>>>;
}

export class AddPlaylistToUserController {
    constructor(
        private service: IAddPlaylistToUserService
    ) {}

    async handle(req: Request, res: Response) {
        const playlist_id = Number(req.params.id);
        const { user_id } = req;
        const response = await this.service.execute({ playlist_id, user_id });
        return res.status(response.status_code).json(response);
    }
}