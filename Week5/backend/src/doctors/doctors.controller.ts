/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { DoctorsService } from './doctors.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/roles.enum';

@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @Roles(Role.ADMIN)
  async getAll() {
    const data = await this.doctorsService.findAll();
    return { success: true, data };
  }
  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() body: any) {
    const newData = await this.doctorsService.create(body);
    return { success: true, data: newData };
  }
  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    const deletedData = await this.doctorsService.remove(id);
    return { success: true, data: deletedData };
  }
}
