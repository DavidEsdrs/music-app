import { Request, Response } from "express";
import { SongAndPlaylist } from "../../../repositories/TagRepository";
import { ISearchByTagDTO } from "./SearchByTagDTO";

interface ISearchByTagService {
    execute(args: ISearchByTagDTO): Promise<SongAndPlaylist>;
}

export class SearchByTagController {
    constructor(
        private service: ISearchByTagService
    ) {}

    async handle(req: Request, res: Response) {
        const limit = Number(req.query.limit);
        const tag = String(req.query.tag);
        const { user_id } = req;
        const result = await this.service.execute({ tag, limit, user_id});
        return res.json(result);
    }
}