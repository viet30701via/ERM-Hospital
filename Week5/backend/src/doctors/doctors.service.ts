import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './schemas/doctors.schema';
import { DeleteResponse } from 'src/patients/patients.service';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }
  async create(dto: any): Promise<Doctor> {
    const newDoctor = new this.doctorModel(dto);
    return newDoctor.save();
  }

  async remove(id: string): Promise<DeleteResponse> {
    const result = await this.doctorModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Delete failed');
    return { message: 'Delete successfull' };
  }
}
