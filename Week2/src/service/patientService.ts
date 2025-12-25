import { Patient } from "../models/patient";
import { IRepository } from "../Repository/repository";

export class PatientService{
    constructor(private repository : IRepository<Patient>){}
    addPatient(patient : Patient) : void {
        this.validate(patient);
        this.repository.add(patient);
        console.log(`Patient name : ${patient.name} has been added`);
    }
    
    private validate(patient : Patient) : void {
        if(patient.age < 0 || patient.age > 100)
        {
            throw new Error("Invalid age");
        }
    }
}