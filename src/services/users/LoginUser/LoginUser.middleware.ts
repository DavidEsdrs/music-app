import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { UnprocessableEntityError } from "../../../api/APIErrors";

const schema = Joi.object({
    email: Joi.
        string().
        email().
        required(),

    password: Joi.
        string().
        min(5).
        required()
});

export const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if(error) {
        throw new UnprocessableEntityError();
    }
    return next();
}