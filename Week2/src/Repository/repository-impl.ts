import { IIdentifiable } from "../Models/base";
import { IRepository } from "./repository";

export class Repository<T extends IIdentifiable> implements IRepository <T>     
{
    private items : T[] = [];

    add(item: T): void {
        this.items.push(item);       
    }
    getAll(): T[] {
        return this.items;
    }
    findById(id: string): T | undefined {
        return this.items.find(item => item.id==id);
    }
    deleteById(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }
    
}
