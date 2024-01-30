import { Request, Response } from "express";
import { TagPlaylist, TagSong } from "../../../entities/Tag";
import { ICreateTagDTO } from "./CreateTagDTO";

interface ICreateTagService {
    execute(args: ICreateTagDTO): Promise<{ tag_song: TagSong, tag_playlist: TagPlaylist }>;
}

export class CreateTagController {
    constructor(
        private service: ICreateTagService
    ) {}

    async handle(req: Request, res: Response) {
        const { name, playlist_id, song_id } = req.body;
        const tag = await this.service.execute({ name, playlist_id, song_id });
        return res.json(tag);
    }
}