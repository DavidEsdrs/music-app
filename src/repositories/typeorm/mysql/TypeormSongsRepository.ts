import { Song } from "../../../entities/Song";
import AppDataSource from "../../../ormconfig";

export const songsRepository = AppDataSource.getRepository(Song).extend({
    async findById(id: number) {
        const song = await this.findOneBy({ id });
        return song;
    }
});