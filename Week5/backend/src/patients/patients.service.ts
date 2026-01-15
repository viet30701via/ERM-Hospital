import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto ';
import { PatientNotFoundException } from './exception/patient-not-found-exception';
import { Patient } from './entities/patient.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
export interface DeleteResponse {
  message: string;
}
@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient.name) private patient: Model<Patient>) {}

  async create(dto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patient(dto);
    return await createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return await this.patient.find().exec();
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patient.findById(id).exec();
    if (!patient) {
      throw new PatientNotFoundException(id);
    }
    return patient;
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const updatedPatient = await this.patient
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();
    if (!updatedPatient) {
      throw new PatientNotFoundException(id);
    }
    return updatedPatient;
  }

  async remove(id: string): Promise<DeleteResponse> {
    const result = await this.patient.findByIdAndDelete(id).exec();
    if (!result) {
      throw new PatientNotFoundException(id);
    }
    return { message: 'Delete Successfull' };
  }
}
