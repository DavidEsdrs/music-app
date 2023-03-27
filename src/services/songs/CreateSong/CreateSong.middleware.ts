import Joi from "joi";

export const createSongSchema = Joi.object({
    title: Joi.string().
        min(2).
        max(50).
        required(),
    
    tags: Joi.array().items(
            Joi.object({
                name: Joi.string().min(2).max(20).required(),
                type: Joi.string().allow("feature", "genre", "artist")
            })
        ).
        min(1).
        required()
});