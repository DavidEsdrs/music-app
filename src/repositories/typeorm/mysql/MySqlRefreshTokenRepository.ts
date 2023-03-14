import { RefreshToken } from "../../../entities/RefreshToken";
import AppDataSource from "../../../ormconfig";

export const TypeormRefreshTokenRepository = AppDataSource.getRepository(RefreshToken).extend({
    async findById(idRefreshToken: number) {
        const rt = await this.findOneBy({ idRefreshToken });
        return rt;
    },

    async findByUser(user_id: number) {
        const rt = await this.findOneBy({ user_id });
        return rt;
    },

    async findByToken(token: string) {
        const rt = await this.findOneBy({ token });
        return rt;
    }
});