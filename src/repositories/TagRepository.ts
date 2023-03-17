import { Tag } from "../entities/Tag";
import { GenericRepository } from "./GenericRepository";

export interface ITagRepository extends GenericRepository<Tag> {
    findByName(name: string): Promise<Tag>;
}