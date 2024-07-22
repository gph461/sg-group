import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsePublic } from '~backend/guards/jwt-auth.guard';
import { Developer } from './developer.model';
import { DeveloperService } from './developer.service';

@Controller('api/v1/developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Get()
  @UsePublic()
  async getAllDeveloper(): Promise<Developer[]> {
    return this.developerService.getAllBook();
  }

  @Post()
  @UsePublic()
  async postDeveloper(@Body() postData: Developer): Promise<Developer> {
    return this.developerService.createDeveloper(postData);
  }

  @Get(':id')
  @UsePublic()
  async getDeveloper(@Param('id') id: number): Promise<Developer | null> {
    return this.developerService.getDeveloper(id);
  }

  @Delete(':id')
  @UsePublic()
  async deletetDeveloper(@Param('id') id: number): Promise<Developer> {
    return this.developerService.deleteDeveloper(id);
  }

  @Put(':id')
  @UsePublic()
  async updateBook(
    @Param('id') id: number,
    @Body() postData: Developer,
  ): Promise<Developer> {
    return this.developerService.updateDeveloper(id, postData);
  }
}
