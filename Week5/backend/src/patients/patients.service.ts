import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto ';
import { v4 as uuidv4 } from 'uuid';
import { PatientNotFoundException } from './exception/patient-not-found-exception';
import { Patient } from './entities/patient.entity';
@Injectable()
export class PatientsService {
  private patients: Patient[] = [];

  create(dto: CreatePatientDto): Patient {
    const newPatient: Patient = {
      id: uuidv4(),
      ...dto,
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  findAll(): Patient[] {
    return this.patients;
  }
  findOne(id: string) {
    const patient = this.patients.find((p) => p.id === id);
    if (!patient) {
      throw new PatientNotFoundException(id);
    }
    return patient;
  }
  update(id: string, dto: UpdatePatientDto) {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new PatientNotFoundException(id);
    }
    this.patients[index] = { ...this.patients[index], ...dto };
    return this.patients[index];
  }
}
