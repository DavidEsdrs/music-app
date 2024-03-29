import Joi from "joi";

export const playlistSchema = Joi.object({
    title: Joi.string().
        min(3).
        max(50).
        required(),
    
    description: Joi.string().
        max(255).
        default(value => value || null).
        optional(),
    
    visibility: Joi.string().
        valid("public", "private").
        optional(),
    
    released_on: Joi.number().
        min(1901).
        optional(),

    featured_picture: Joi.any().
        optional(),

    tags: Joi.array().items(
            Joi.object({
                name: Joi.string().
                    min(2).
                    max(20),

                type: Joi.string().allow("genre", "artist", "feature")
            })
        ).
        min(1).
        required()
});