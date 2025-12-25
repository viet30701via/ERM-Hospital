import { Repository } from "../src/Repository/repository-impl";
import { PatientService } from "./Service/patientService";
import { Patient } from "./Models/patient";
import { Role, PatientStatus } from "./Models/type";
import { Doctor } from "./Models/docter";
import { DoctorService } from "./Service/doctorService";
import { seedPatients,seedDoctors } from "./Data/data";


const repoPatient = new Repository<Patient>(seedPatients);
const patientService = new PatientService(repoPatient);
const rePoDocter = new Repository<Doctor>(seedDoctors);
const doctorService = new DoctorService(rePoDocter);


const newPatient: Patient = {
    id: "4",
    name: "John Doe",
    age: 30,
    gender: "male",
    role: Role.Patient,
    conditions: "Diabetes",
    status: PatientStatus.Active,
    medicalRecord: [
        {
         id: "mr1",               
            patientId: "4",          
            diagnosis: "General Checkup",
            date: new Date(),
            prescription: [] 
        } 
    ]
};
const newDoctor : Doctor = {
    id: "D004",
    name: "Cr7",
    specialty: "Oncology",
    role: Role.Doctor,
    patient: []
}
// console.log(listPatient);
patientService.addPatient(newPatient);
// const getPatientById = repoPatient.findById("4")

// console.log(rePoDocter.getAll());
// console.log(`Get patient`,getPatientById);
console.log(JSON.stringify(repoPatient.getAll(),null,2));
doctorService.addDoctor(newDoctor);
console.log(JSON.stringify(rePoDocter.getAll(),null,2));