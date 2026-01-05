import { IIdentifiable } from "../Models/base";

export interface IRepository<T extends IIdentifiable> {
    add(item: T): void;
    getAll(): T[];
    findById(id: string): T | undefined;
    deleteById(id: string): void;
}
