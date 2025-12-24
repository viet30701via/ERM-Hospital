import { Patient,Role,PatientStatus } from "./models/patient";
import { Doctor } from "./models/docter";
import { MedicalRecord } from './models/medical-record.js';
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

// let newPatient: Patient = {
//     id: "4",
//     name: "Alice Brown",
//     age: 35,
//     gender: "female",
//     role: Role.Patient,
//     conditions: "Heart Disease",
//     status: PatientStatus.Active
// };

// //📘Ngày 2: TypeScript Core - Generic và Module
// function addItem<T>(array: T[], newItem: T): T[] {
//     return [...array, newItem];
// }

// function isValidateAge(patient :Patient): boolean {
//     return patient.age >= 0 && patient.age <= 120;
// }


// if(isValidateAge(newPatient)) {
//     patientList = addItem(patientList, newPatient);
//     console.log("New patient added successfully.");
// }
// else {
//     console.log("Invalid age for the new patient.");
// }
// console.log("Patient list after updated:", patientList);


// //📘Ngày 3: TypeScript Core - Decorator và Utility Types


// function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//         console.log(`\n[Nhật ký]: Đang thực hiện hành động: ${propertyKey} với các tham số: ${JSON.stringify(args)}`);
//         console.log(`[DỮ LIỆU]:`, args);

//         return originalMethod.apply(this, args);
//     }
// }

// class EMRSystem {
//     private patient :Patient[] = [];
//     private record :MedicalRecord[] = [];
    
//     @Log
//     addPatient(patient : Patient) {
//         this.patient.push(patient);
//     }

//     @Log
//     updatePatient(id: string, updates: Partial<Patient>) {
//         this.patient = this.patient.map(p => p.id ===id ? { ...p, ...updates } : p);
//     }
    
//     @Log
//     addMedicalRecord(record : MedicalRecord) {
//         this.record.push(record);
//     }

//     getMedicalRecordViews(): Pick<MedicalRecord, 'id' | 'date'>[] {
//         return this.record.map(record => ({
//             id: record.id,
//             date: record.date
//         }));
//     }

// }

// const hospitalSystem = new EMRSystem();
// hospitalSystem.addPatient({ id: "1", name: "Bob Johnson", age: 45, gender: 'male', role: 'patient' as any, conditions: 'Asthma', status: PatientStatus.Inactive     });
// hospitalSystem.updatePatient("1", { name: "Ronaldo" });

// hospitalSystem.addMedicalRecord({ id: "rec1", patientId: 1, date: new Date(), diagnosis: "Flu" });

// console.log("\n[VIEW]: Danh sách bệnh án rút gọn:", hospitalSystem.getMedicalRecordViews());

// function isPatient(obj: any): obj is Patient {
//     return (obj !== null &&
//     typeof obj.name === 'string' &&
//     typeof obj.age === 'number' &&
//     Object.values(PatientStatus).includes(obj.status)
//     );
// }

// function processPatientData(data: any) {
//     if (isPatient(data)) {
//         console.log(`Processing patient data for ${data.name}, age ${data.age}, status ${data.status}.`);
//     } else {
//         console.log("Invalid patient data.");
//     }
// }


// processPatientData(newPatient);


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
    findById(id: string): T {
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