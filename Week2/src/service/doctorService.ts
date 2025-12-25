import { Doctor } from "../models/docter";
import { IRepository } from "../Repository/repository";

export class DoctorService{
    constructor(private repository: IRepository<Doctor>){}
    addDoctor(doctor : Doctor){
        this.repository.add(doctor);
        console.log(`Doctor name : ${doctor.name} has been added`);
    }
}