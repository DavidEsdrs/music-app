import { SongUser } from "../../../entities/SongUser";
import AppDataSource from "../../../ormconfig";

export const typeormSongUserRepository = AppDataSource.getRepository(SongUser).extend({
    async findById(id: number) {
        const songUserRel = await this.findOneBy({ id });
        return songUserRel;
    }
});