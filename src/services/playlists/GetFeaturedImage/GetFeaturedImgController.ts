import { Request, Response } from "express";
import { ReadStream } from "fs";
import { IGetFeaturedImgDTO } from "./GetFeaturedImgDTO";

interface IGetFeaturedImgService {
    execute(args: IGetFeaturedImgDTO): Promise<ReadStream>;
}

export class GetFeaturedImgController {
    constructor(
        private service: IGetFeaturedImgService 
    ) {}

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { user_id } = req;
        const content = await this.service.execute({ id: Number(id), requester_id: Number(user_id) });
        content.pipe(res);
    }
}