/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto ';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decoorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('patients')
@ApiBearerAuth()
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @Roles('admin', 'doctor')
  create(@Body() createPatientDto: CreatePatientDto, @Request() req) {
    return this.patientsService.create(createPatientDto, req.user);
  }

  @Get()
  @Roles('admin', 'doctor', 'nurse')
  findAll(@Request() req) {
    return this.patientsService.findAll(req.user);
  }

  @Get(':id')
  @Roles('admin', 'doctor', 'nurse')
  findOne(@Param('id') id: string, @Request() req) {
    return this.patientsService.findOne(id, req.user);
  }

  @Put(':id')
  @Roles('admin', 'doctor')
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Request() req,
  ) {
    return this.patientsService.update(id, updatePatientDto, req.user);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string, @Request() req) {
    return this.patientsService.remove(id, req.user);
  }
}
