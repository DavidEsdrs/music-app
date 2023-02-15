import { Request, Response } from "express";
import { ReadStream } from "fs";
import { IDonwloadSongDTO } from "./DownloadSongDTO";

interface IDonwloadSongService {
    execute(args: IDonwloadSongDTO): Promise<ReadStream>
}

export class DonwloadSongController {
    constructor(
        private service: IDonwloadSongService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const song_id = Number(req.params.song)
        const readStream = await this.service.execute({ song_id, user_id });
        readStream.pipe(res);
    }
}