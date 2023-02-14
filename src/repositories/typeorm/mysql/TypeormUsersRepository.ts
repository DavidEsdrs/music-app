import { User } from "../../../entities/User";
import AppDataSource from "../../../ormconfig";

export const TypeormUsersRepository = AppDataSource.getRepository(User).extend({
    async findByEmail(email: string) {
        const user = await this.findOneBy({ email });
        return user;
    },

    async findById(id: number) {
        const user = await this.query(`
            SELECT id, username, email, password, bio, path_profile_picture, created_at, updated_at
            FROM users
            WHERE id = :id
        `, { id });
        return user;
    }
});