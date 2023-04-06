import { Request, Response } from "express";
import { ReadStream } from "fs";
import { IDownloadPlaylistPictureDTO } from "./DownloadPlaylistPictureDTO";

interface IDownloadPlaylistPictureService {
    execute(args: IDownloadPlaylistPictureDTO): Promise<ReadStream>;
}

export class DownloadPlaylistPictureController {
    constructor(
        private service: IDownloadPlaylistPictureService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const playlist_id = Number(req.params.id);
        const readStream = await this.service.execute({ user_id, playlist_id });
        if(readStream instanceof ReadStream)
            readStream.pipe(res);
        else
            return res.sendStatus(204);
    }
}