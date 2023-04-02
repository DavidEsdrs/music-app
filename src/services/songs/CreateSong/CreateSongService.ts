import { Song } from "../../../entities/Song";
import { TagSong } from "../../../entities/Tag";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { ITagSongRepository } from "../../../repositories/TagRepository";
import { FileHandling } from "../../../utils/fileHandling/FileHandling";
import { fulfillSong } from "../../../utils/fulfillInfo";
import { IAddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistController";
import { ICreateSongDTO } from "./CreateSongDTO";

export class CreateSongService {
    constructor(
        private songsRepository: ISongsRepository,
        private tagsRepository: ITagSongRepository,
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

    async saveTagPromise(tag: TagSong, song_id: number) {
        const tagObj = this.tagsRepository.create({ name: tag.name, song_id, tag_type: tag.tag_type });
        const tagInDb = await this.tagsRepository.save(tagObj);
        return tagInDb;
    }
}