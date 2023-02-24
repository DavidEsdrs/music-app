import Joi from "joi";
import { APIErrors, UnprocessableEntityError } from "../api/APIErrors";
import { ExpressMiddleware } from "./Types";

export const validateQuery = (schema: Joi.ObjectSchema, err?: APIErrors): ExpressMiddleware => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query);
        req.query = value;
        if(error) {
            throw err ?? new UnprocessableEntityError();
        }
        return next();
    };
};

export const validateBody = (schema: Joi.ObjectSchema, err?: APIErrors): ExpressMiddleware =>  {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if(error) {
            throw err ?? new UnprocessableEntityError();
        }
        return next();
    };
};