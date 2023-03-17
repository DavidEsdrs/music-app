import { Request, Response } from "express";
import { Song } from "../../../entities/Song";
import { ICreateSongDTO } from "./CreateSongDTO";

interface ICreateSongService {
    execute(args: ICreateSongDTO): Promise<Song>;
}

export class CreateSongController {
    constructor(
        private service: ICreateSongService
    ) {}

    async handle(req: Request, res: Response) {
        const { title } = req.body;
        const file_path = req.file_props.file_name;
        const { user_id: creator_fk } = req;
        const song = await this.service.execute({ creator_fk, file_path, title });
        return res.json(song);
    }
}