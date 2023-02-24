import { Request, Response } from "express";
import { Song } from "../../../entities/Song";
import { IGetSongsFromPlaylistDTO } from "./GetSongsFromPlaylistDTO";

export type SongWithDownloadLink = Song & { download_link: string };

interface IGetSongsFromPlaylistService {
    execute(args: IGetSongsFromPlaylistDTO): Promise<SongWithDownloadLink[]>;
}

export class GetSongsFromPlaylistController {
    constructor(
        private service: IGetSongsFromPlaylistService
    ) {}

    async handle(req: Request, res: Response) {
        const playlist_id = Number(req.params.id);
        const { user_id } = req;
        const songs = await this.service.execute({ playlist_id, user_id });
        return res.json(songs);
    }
}