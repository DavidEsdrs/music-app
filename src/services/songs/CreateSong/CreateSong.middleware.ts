import Joi from "joi";

export const createSongSchema = Joi.object({
    title: Joi.string().
        min(2).
        max(50).
        required(),
    
    tags: Joi.array().items(
            Joi.string().
                min(2).
                max(20)
        ).
        min(1).
        required()
});