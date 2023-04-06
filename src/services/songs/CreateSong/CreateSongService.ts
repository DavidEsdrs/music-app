import { Song } from "../../../entities/Song";
import { TagSong } from "../../../entities/Tag";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { ITagSongRepository } from "../../../repositories/TagRepository";
import { FileHandling } from "../../../utils/fileHandling/FileHandling";
import { fulfillSong } from "../../../utils/fulfillInfo";
import { IAddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistController";
import { ICreateSongDTO } from "./CreateSongDTO";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const removeFile = promisify(fs.unlink);

export class CreateSongService {
    constructor(
        private songsRepository: ISongsRepository,
        private tagsRepository: ITagSongRepository,
        private fileHandling: FileHandling
    ) {}

    async execute({ title, file_path, creator_fk, tags }: ICreateSongDTO) {
        let songId: number;
        try {
            const song = this.songsRepository.create({ title, creator_fk, file_path });
            songId = await this.songsRepository.saveSong(song);
            const songInDb = await this.songsRepository.findById(songId);
            const promises = tags.map(tag => this.saveTagPromise(tag, songId));
            const fulfilledSongPromise = fulfillSong(songInDb, this.fileHandling);
            const [fulfilledSong, ...tagsInDb] = await Promise.all([fulfilledSongPromise, ...promises]);
            const songsWithTags = {
                ...fulfilledSong,
                tags: tagsInDb
            };
            return songsWithTags as Song;
        }

        catch(err) {
            const filePath = path.resolve(__dirname, "..", "..", "..", "..", "uploads", "songs", file_path);
            await removeFile(filePath);
            if(songId) {
                await this.songsRepository.deleteSong(songId);
            }
            throw err;
        }
    }

    async saveTagPromise(tag: TagSong, song_id: number) {
        const tagObj = this.tagsRepository.create({ name: tag.name, song_id, tag_type: tag.tag_type });
        const tagInDb = await this.tagsRepository.save(tagObj);
        return tagInDb;
    }
}