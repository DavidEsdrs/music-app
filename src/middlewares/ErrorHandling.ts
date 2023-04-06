import { Request, Response, NextFunction } from "express";
import { APIErrors } from "../api/APIErrors";

export const errorHandling = (err: APIErrors, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof APIErrors) {
        return res.status(err.status).json({
            error: err.message,
            status_code: err.status
        });
    }

    else {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}