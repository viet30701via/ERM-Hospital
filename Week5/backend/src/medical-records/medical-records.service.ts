import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalRecord } from 'src/patients/schemas/medical-record.schema';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord.name)
    private medicalRecordModel: Model<MedicalRecord>,
  ) {}
  async create(data: any) {
    return new this.medicalRecordModel(data).save();
  }

  async findByPatientId(patientId: string) {
    return this.medicalRecordModel
      .find({ patientId })
      .populate('doctorId', 'name')
      .sort({ createdAt: -1 })
      .exec();
  }
}
