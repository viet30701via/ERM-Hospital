import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto ';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePatientDto) {
    return await this.patientsService.create(dto);
  }
  @Get()
  async findAll() {
    return await this.patientsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientsService.findOne(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatepatientDto: UpdatePatientDto,
  ) {
    return await this.patientsService.update(id, updatepatientDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.patientsService.remove(id);
  }
}
