import { Response } from "express";
import { Request } from "express";
import { NextFunction } from "express";

export const parseJson = (req: Request, res: Response, next: NextFunction) => {
    const jsonTags = JSON.parse(req.body.tags);
    const tagsMapped = jsonTags.map((stringfiedTag: string) => JSON.parse(stringfiedTag));
    req.body.tags = tagsMapped;
    next();
}