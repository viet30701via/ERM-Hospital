import { Doctor } from "../Models/docter";
import { IRepository } from "../Repository/repository";
import { validateDoctor } from "../Validate/validateDoctor";

export class DoctorService{
    constructor(private repository: IRepository<Doctor>){}
    addDoctor(doctor: Doctor): void {
    validateDoctor(doctor);
    this.repository.add(doctor);
    console.log(`✅ Doctor '${doctor.name}' (${doctor.specialty}) has been added`);
  }
}