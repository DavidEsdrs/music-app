import Joi from "joi";

export const createUserSchema = Joi.object({
    username: Joi.
        string().
        min(2).
        max(20).
        required(),
    email: Joi.
        string().
        email().
        required(),

    password: Joi.
        string().
        min(5).
        required()
});