import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  doctorId: Types.ObjectId;
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
  @Prop({ default: 'Active' })
  status: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
