import { Song } from "../../../entities/Song";
import { Tag } from "../../../entities/Tag";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { ITagRepository } from "../../../repositories/TagRepository";
import { FileHandling } from "../../../utils/fileHandling/FileHandling";
import { fulfillSong } from "../../../utils/fulfillInfo";
import { IAddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistController";
import { ICreateSongDTO } from "./CreateSongDTO";

export class CreateSongService {
    constructor(
        private songsRepository: ISongsRepository,
        private tagsRepository: ITagRepository,
        private fileHandling: FileHandling
    ) {}

    async execute({ title, file_path, creator_fk, tags }: ICreateSongDTO) {
        const song = this.songsRepository.create({ title, creator_fk, file_path });
        const songId = await this.songsRepository.saveSong(song);
        const songInDb = await this.songsRepository.findById(songId);
        const promises = tags.map(tag => this.saveTagPromise(JSON.parse(tag), songId));
        const fulfilledSongPromise = fulfillSong(songInDb, this.fileHandling);
        const [fulfilledSong, ...tagsInDb] = await Promise.all([fulfilledSongPromise, ...promises]);
        const songsWithTags = {
            ...fulfilledSong,
            tags: tagsInDb
        };
        return songsWithTags as Song;
    }

    async saveTagPromise(tag: Tag, song_id: number) {
        const tagObj = this.tagsRepository.create({ name: tag.name, song_id, type: tag.type });
        const tagInDb = await this.tagsRepository.save(tagObj);
        return tagInDb;
    }
}