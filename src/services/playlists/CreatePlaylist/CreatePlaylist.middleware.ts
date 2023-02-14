import Joi from "joi";
import { UnprocessableEntityError } from "../../../api/APIErrors";
import { ExpressMiddleware } from "../../../utils/Types";

const playlistSchema = Joi.object({
    title: Joi.string().
        min(3).
        max(50).
        required(),
    
    description: Joi.string().
        max(255).
        optional(),
    
    visibility: Joi.string().
        valid("public", "private").
        optional(),
    
    released_on: Joi.number().
        min(1500).
        max(new Date().getUTCFullYear()).
        optional(),

    path_featured_picture: Joi.string().
        optional()
});

export const validateCreatePlaylist: ExpressMiddleware = (req, res, next) => {
    const { error } = playlistSchema.validate(req.body);
    if(error) {
        throw new UnprocessableEntityError();
    }
    return next();
}