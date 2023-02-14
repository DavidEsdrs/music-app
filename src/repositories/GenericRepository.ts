export interface GenericRepository<T> {
    create(args: Partial<T>): T;
    save(args: T): Promise<T>;
    delete(args: Partial<T>): Promise<any>;
    findById(id: number): Promise<T>;
}