import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ForbiddenRequestError, UnauthorizedRequestError } from "../api/APIErrors";

interface IPayload {
    sub: string;
}

export const ensureAuthUser = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if(!auth) {
        throw new UnauthorizedRequestError("No JWT token was found in the request headers");
    }
    const [ , token ] = auth.split(' ');
    if(!token) {
        throw new UnauthorizedRequestError("The JWT token wasn't found in the given auth token!");
    }
    try {
        const { sub } = verify(token, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: false }) as IPayload;
        req.user_id = Number(sub);
        return next();
    }
    catch(error) {
        throw new UnauthorizedRequestError("The JWT has expired!");
    }
}