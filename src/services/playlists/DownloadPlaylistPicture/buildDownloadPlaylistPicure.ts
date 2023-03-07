import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { DownloadPlaylistPictureController } from "./DownloadPlaylistController";
import { DownloadPlaylistPictureService } from "./DownloadPlaylistPictureService"

export const buildDownloadPlaylistPicture = () => {
    const service = new DownloadPlaylistPictureService(TypeormPlaylistsRepository);
    const controller = new DownloadPlaylistPictureController(service);
    return controller;
}