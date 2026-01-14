/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
} from 'class-validator';
export class CreatePatientDto {
  @IsString()
  @IsNotEmpty({ message: 'Invalid Name' })
  name: string;

  @IsNumber()
  @Min(0, { message: 'Age must be > 0' })
  age: number;

  @IsString()
  gender: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;
}
