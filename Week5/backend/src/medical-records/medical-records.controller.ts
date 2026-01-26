/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { MedicalRecordsService } from './medical-records.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/roles.enum';

@Controller('medical-records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicalRecordsController {
  constructor(private readonly service: MedicalRecordsService) {}

  @Post()
  @Roles(Role.DOCTOR, Role.ADMIN)
  async create(@Body() body: any, @Req() req) {
    return {
      success: true,
      data: await this.service.create({ ...body, doctorId: req.user.userId }),
    };
  }

  @Get('patient/:id')
  @Roles(Role.DOCTOR, Role.ADMIN)
  async getByPatient(@Param('id') id: string) {
    return {
      success: true,
      data: await this.service.findByPatientId(id),
    };
  }
}
