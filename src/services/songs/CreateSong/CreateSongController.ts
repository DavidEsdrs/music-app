import { Request, Response } from "express";
import { UnprocessableEntityError } from "../../../api/APIErrors";
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
        const { title, tags } = req.body;
        const file_path = req.file_props?.file_name;
        if(!file_path) throw new UnprocessableEntityError("You must to send a file!");
        const { user_id: creator_fk } = req;
        const song = await this.service.execute({ creator_fk, file_path, title, tags });
        return res.json(song);
    }
}