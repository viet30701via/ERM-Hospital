import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class MedicalRecord extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patientId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  doctorId: string;

  @Prop({ required: true })
  diagnosis: string;
  @Prop()
  prescription: string;

  @Prop()
  notes: string;
}
export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
