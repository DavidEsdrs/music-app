import { User } from "../entities/User";

export interface IUsersRepository {
    create(args: Partial<User>): User;
    save(args: User): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}