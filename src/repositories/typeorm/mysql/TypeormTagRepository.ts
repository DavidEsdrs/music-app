import { Tag } from "../../../entities/Tag";
import AppDataSource from "../../../ormconfig";

export const TypeormTagRepository = AppDataSource.getRepository(Tag).extend({
    async findById(idTag: number) {
        const tag = await this.findOneBy({ idTag });
        return tag;
    },

    async findByName(name: string) {
        const tag = await this.findOneBy({ name });
        return tag;
    }
});