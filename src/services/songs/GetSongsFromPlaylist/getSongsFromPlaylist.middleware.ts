import Joi from "joi";

export const getSongsFromPlaylistQuerySchema = Joi.object({
    select: Joi.
        object({
            song_title: Joi.
                boolean().
                optional(),
            file_path: Joi.
                boolean().
                optional(), 
            download_link: Joi.
                boolean().
                optional(), 
            duration: Joi.
                boolean().
                optional()
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