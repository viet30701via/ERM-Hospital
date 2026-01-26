/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto ';
import { PatientNotFoundException } from './exception/patient-not-found-exception';
import { Patient } from './entities/patient.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PatientDocument } from './schemas/patients.schema';
export interface DeleteResponse {
  message: string;
}
@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient.name) private patient: Model<Patient>) {}

  async checkOwnership(patientId: string, user: any): Promise<PatientDocument> {
    const patient = await this.patient.findById(patientId).exec();
    if (!patient) {
      throw new PatientNotFoundException(patientId);
    }
    if (user.role !== 'admin' && patient.doctorId.toString() !== user.userId) {
      throw new ForbiddenException('You dont hanve acces');
    }
    return patient;
  }

  async create(dto: CreatePatientDto, user: any): Promise<PatientDocument> {
    const newPatient = new this.patient({
      ...dto,
      doctorId: new Types.ObjectId(user.userId),
    });
    return newPatient.save();
  }

  async update(
    id: string,
    dto: UpdatePatientDto,
    user: any,
  ): Promise<PatientDocument> {
    await this.checkOwnership(id, user);
    const updatePatient = await this.patient
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updatePatient) throw new NotFoundException('Update failed');
    return updatePatient;
  }

  async remove(id: string, user: any): Promise<DeleteResponse> {
    await this.checkOwnership(id, user);
    const result = await this.patient.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Delete failed');
    return { message: 'Delete successfull' };
  }

  async findAll(user: any): Promise<PatientDocument[]> {
    if (user.role === 'admin') {
      return this.patient.find().exec();
    }
    const filter = {
      doctorId: new Types.ObjectId(user.userId),
    };

    return this.patient.find(filter).exec();
  }

  async findOne(id: string, user: any): Promise<PatientDocument> {
    return this.checkOwnership(id, user);
  }
}
