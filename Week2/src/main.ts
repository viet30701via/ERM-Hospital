import { Repository } from "../src/Repository/repository-impl";
import { PatientService } from "./Service/patientService";
import { Patient } from "./Models/patient";
import { Role, PatientStatus } from "./Models/type";
import { Doctor } from "./Models/docter";
import { DoctorService } from "./Service/doctorService";
import { listPatient,listDoctor } from "./Data/data";


const repoPatient = new Repository<Patient>();
const patientService = new PatientService(repoPatient);
const rePoDocter = new Repository<Doctor>
const doctorService = new DoctorService(rePoDocter);

const newPatient: Patient = {
    id: "4",
    name: "John Doe",
    age: 30,
    gender: "male",
    role: Role.Patient,
    conditions: "Diabetes",
    status: PatientStatus.Active
};

const newDoctor : Doctor = {
    id: "1",
    name: "Cr7",
    specialty: "Oncology",
    role: Role.Doctor,
}
patientService.addPatient(newPatient);
console.table(repoPatient.getAll());
doctorService.addDoctor(newDoctor);
console.table(rePoDocter.getAll());