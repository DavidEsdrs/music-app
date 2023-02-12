import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { UploadFeaturedImgPlaylist } from "./UploadFeaturedImgPlaylist"
import { UploadFeaturedImgPlaylistController } from "./UploadFeaturedImgPlaylistController";

export const buildUploadFeaturedImgPlaylist = () => {
    const service = new UploadFeaturedImgPlaylist(TypeormPlaylistsRepository);
    const controller = new UploadFeaturedImgPlaylistController(service);
    return controller;
}