import { PartialType } from '@nestjs/mapped-types'; // Cần cài: npm i @nestjs/mapped-types
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
