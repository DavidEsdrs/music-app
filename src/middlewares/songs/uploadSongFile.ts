import path from "path";
import fs from "fs";
import multer from "multer";
import mime from "mime";
import { Request } from "express";
import { UnprocessableEntityError } from "../../api/APIErrors";
import { createSongSchema } from "../../services/songs/CreateSong/CreateSong.middleware";

const songFileUpload = {
    // URL in wich the uploaded file will be stored
    URL: path.basename("uploads"),

    // Set the storage estrategy used by multer 
    storage(): multer.StorageEngine {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                if(!fs.existsSync(songFileUpload.URL)) {
                    fs.mkdirSync(songFileUpload.URL);
                }
                cb(null, songFileUpload.URL + "/songs");
            },

            filename: (req, file, cb) => {
                const file_type = mime.getExtension(file.mimetype);
                const file_name = `${new Date().getTime()}.${file.originalname.split('.').pop()}`;
                req.file_props = { file_type, file_name };
                cb(null, file_name);
            }
        });
    },

    fileFilter() {
        return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
            const type = mime.getExtension(file.mimetype);
            const conditions = [ "mpga" ];
            const { error } = createSongSchema.validate(req.body);
            if(error) return cb(error);
            if(!conditions.includes(type)) {
                return cb(new UnprocessableEntityError("The file type is invalid!"));
            }
            cb(null, true);
        }
    },

    getConfig(): multer.Options {
        return {
            storage: songFileUpload.storage(),
            fileFilter: songFileUpload.fileFilter()
        }
    }

}

export const validateAndParseSongFileUpload = multer(songFileUpload.getConfig()).single("song_file");