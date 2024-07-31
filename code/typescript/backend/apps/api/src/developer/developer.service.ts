import { Injectable } from '@nestjs/common';
import { db } from '~backend/db';
import { DeveloperDto } from './developer.dto';

@Injectable()
export class DeveloperService {
  async createDeveloper(data: DeveloperDto): Promise<DeveloperDto> {
    return await db.developer.create({
      data,
    });
  }

  async getAllDeveloper(): Promise<DeveloperDto[]> {
    return await db.developer.findMany({});
  }

  async getDeveloper(id: number): Promise<DeveloperDto> {
    return await db.developer.findUnique({ where: { id: Number(id) } });
  }

  async updateDeveloper(id: number, data: DeveloperDto): Promise<DeveloperDto> {
    return await db.developer.update({
      where: { id: Number(id) },
      data: { name: data.name },
    });
  }

  async deleteDeveloper(id: number): Promise<DeveloperDto> {
    return await db.developer.delete({
      where: { id: Number(id) },
    });
  }
}
