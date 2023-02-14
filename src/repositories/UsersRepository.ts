import { User } from "../entities/User";
import { GenericRepository } from "./GenericRepository";

export interface IUsersRepository extends GenericRepository<User> {
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
}