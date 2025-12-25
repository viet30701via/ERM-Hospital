import { IIdentifiable } from "../Models/base";
import { IRepository } from "./repository";

export class Repository<T extends IIdentifiable> implements IRepository <T>     
{
    private items : T[] = [];

    constructor(seedData: T[] = []){
    this.items = [...seedData];
    }

    add(item: T): void {
        const exist = this.findById(item.id);
        if(exist)
        {
            throw new Error(`Item with id ${item.id} not exists`);
        }
        this.items.push(item);
       
    }
    updateById(id: string,updates : Partial<T>): boolean {
        const index = this.items.findIndex(item => item.id === id); 
        if(index === -1) return false;
        this.items[index] = {...this.items[index],...updates}
        return true;
    }
    getAll(): T[] {
        return [...this.items];
    }
    findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
    }

    deleteById(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
    }
    
}
