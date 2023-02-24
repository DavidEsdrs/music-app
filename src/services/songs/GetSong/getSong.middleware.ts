import Joi from "joi";

export const getSongSchema = Joi.object({
    select: Joi.
        object({
            file_path: Joi.
                boolean().
                optional(),
            title: Joi.
                boolean().
                optional(),
            creator_fk: Joi.
                boolean().
                optional(),
            playlists: Joi.
                boolean().
                optional(),
            download_link: Joi.
                boolean().
                optional(),
            duration: Joi.
                boolean().
                optional()
        })
        .optional(),
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