import Joi from "joi";

export const getPlaylistSchema = Joi.object({
    select: Joi.
        object({
            title: Joi.
                boolean().
                optional(),
            path_featured_picture: Joi.
                boolean().
                optional(), 
            visibility: Joi.
                boolean().
                optional(), 
            description: Joi.
                boolean().
                optional(),
            released_on: Joi.
                boolean().
                optional(),
            created_at: Joi.
                boolean().
                optional(),
            updated_at: Joi.
                boolean().
                optional(),
            creator_fk: Joi.
                boolean().
                optional(),
            songs_url: Joi.
                boolean().
                optional(),
            playlist_url: Joi.
                boolean().
                optional(),
        }).
        optional(),

    take: Joi.
        number().
        min(1).
        max(1000).
        optional(),
    
    page: Joi.
        number().
        min(1).
        optional()
});