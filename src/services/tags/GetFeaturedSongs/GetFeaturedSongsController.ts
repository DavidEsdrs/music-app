import { Request, Response } from "express";
import { SongAndPlaylist } from "../../../repositories/TagRepository";
import { IGetFeaturedSongsDTO } from "./GetFeaturedSongsDTO";

interface IGetFeaturedSongsService {
    execute(args: IGetFeaturedSongsDTO): Promise<SongAndPlaylist>;
}

export class GetFeaturedSongsController {
    constructor(
        private service: IGetFeaturedSongsService
    ) {}

    async handle(req: Request, res: Response) {
        const song_id = Number(req.params.song);
        const relatedSongsAndPlaylists = await this.service.execute({ song_id });
        return res.json(relatedSongsAndPlaylists);
    }
}