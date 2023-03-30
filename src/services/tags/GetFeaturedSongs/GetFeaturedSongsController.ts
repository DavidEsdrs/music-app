import { Request, Response } from "express";
import { SongAndPlaylist, TagSongOrPlaylist } from "../../../repositories/TagRepository";
import { IGetFeaturedSongsDTO } from "./GetFeaturedSongsDTO";

interface IGetFeaturedSongsService {
    execute(args: IGetFeaturedSongsDTO): Promise<TagSongOrPlaylist>;
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