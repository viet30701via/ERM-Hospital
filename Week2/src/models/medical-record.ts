export interface Patient {
    id: number;
    name: string;
    age: number;
    condition: string;
}

export interface MedicalRecord {
    id: string;
    patientId: number;
    date: Date;
    diagnosis: string; 
}