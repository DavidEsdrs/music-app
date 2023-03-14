import { User } from "../../../entities/User";
import AppDataSource from "../../../ormconfig";

export const TypeormUsersRepository = AppDataSource.getRepository(User).extend({
    async findByEmail(email: string) {
        const user = await this.findOneBy({ email });
        return user;
    },

    async findById(idUser: number) {
        const user = await this.findOneBy({ idUser });
        return user;
    }
});