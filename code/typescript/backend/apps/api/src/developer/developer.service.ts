import { Injectable } from '@nestjs/common';
import { db } from '~backend/db';
import { Developer } from './developer.model';

@Injectable()
export class DeveloperService {
  async getAllBook(): Promise<Developer[]> {
    return db.developer.findMany();
  }

  async getDeveloper(id: number): Promise<Developer | null> {
    return db.developer.findUnique({ where: { id: Number(id) } });
  }

  async createDeveloper(data: Developer): Promise<Developer> {
    return db.developer.create({
      data,
    });
  }

  async updateDeveloper(id: number, data: Developer): Promise<Developer> {
    return db.developer.update({
      where: { id: Number(id) },
      data: { name: data.name },
    });
  }

  async deleteDeveloper(id: number): Promise<Developer> {
    return db.developer.delete({
      where: { id: Number(id) },
    });
  }
}
