import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UnauthorizedRequestError } from "../api/APIErrors";

interface IPayload {
    sub: string;
}

export const ensureAuthUserSoft = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if(!auth) {
        return next();
    }
    const [ , token ] = auth.split(' ');
    if(!token) {
        throw new UnauthorizedRequestError();
    }
    try {
        const { sub } = verify(token, process.env.JWT_TOKEN) as IPayload;
        req.user_id = Number(sub);
        return next();
    }
    catch(error) {
        return next();
    }
}