import { Types } from 'mongoose';

export class Patient {
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  doctorId: Types.ObjectId;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}