import { Patient,Role,PatientStatus } from "./models/patient";
import { Doctor } from "./models/docter";
import { MedicalRecord } from './models/medical-record';
import { IIdentifiable } from "./models/base";
let patientList: Patient[] = [
    {
        id: "1",
        name: "John Doe",
        age: 30,
        gender: "male",
        role: Role.Patient,
        conditions: "Diabetes",
        status: PatientStatus.Active
    },
    {
        id: "2",
        name: "Jane Smith",
        age: 25,
        gender: "female",
        role: Role.Patient,
        conditions: "Hypertension",
        status: PatientStatus.Active
    },
    {
        id: "3",
        name: "Bob Johnson",
        age: 45,
        gender: "male",
        role: Role.Patient,
        conditions: "Asthma",
        status: PatientStatus.Inactive
    }
];

// Định nghĩa cho 1 interface lưu trữ
interface IRepository<T extends IIdentifiable> {
    add(item: T): void;
    getAll() : T[] ;
    findById(id: string): T | undefined ;
    deleteById(id:string) :void ;
    searchByName(name: string): T[] ;
}


//Lưu trữ dữ liệu vào mảng
class Repository<T extends IIdentifiable> implements IRepository<T> {
    private items: T[] = [];
    add(item: T): void {
        this.items.push(item);
    }
    getAll(): T[] {
        return this.items;
    }   
    findById(id: string): T | undefined {
    return this.items.find(item => item.id === id);
    }
    deleteById(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
        console.log(`Delete patient with id ${id} successfully.`);
    }
    searchByName(name: string): T[] {
        return this.items.filter(item => (item as any).name && (item as any).name.includes(name));
    }
}

//Service xử lý logic nghiệp vụ

class PatientService {
    constructor(private repository: IRepository<Patient>) {}

    registerPatient(patient: Patient)
    {
        if(patient.age <0 || patient.age >120) {
            throw new Error("Invalid age for patient.");
        }
        else {
            this.repository.add(patient);
            console.log(`Add patient ${patient.name} successfully.`);
        }
    }
}

const patientRepository = new Repository<Patient>();
const patientService = new PatientService(patientRepository);
patientList.forEach(patient => patientRepository.add(patient));

patientService.registerPatient({
    id: "5",
    name: "Charlie Davis",
    age: 28,
    gender  : "male",
    role : Role.Patient,    
    conditions: "Allergy",
    status : PatientStatus.Active
}as Patient);



const deletePatientId = "2";
patientRepository.deleteById(deletePatientId);


const finalPatients = patientRepository.getAll();
console.log("\nFinal patient list:", finalPatients);

const findPatientById = "3";
console.log(`\nFind patient by id ${findPatientById}:`, patientRepository.findById(findPatientById));

const searchName = "John";
console.log(`\nSearch patients by name "${searchName}":`, patientRepository.searchByName(searchName));