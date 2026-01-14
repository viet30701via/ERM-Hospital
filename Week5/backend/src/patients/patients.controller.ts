import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto ';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updatepatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatepatientDto);
  }
}
