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
import { DeveloperDto } from './developer.dto';
import { DeveloperService } from './developer.service';

@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post()
  async postDeveloper(@Body() postData: DeveloperDto): Promise<DeveloperDto> {
    return await this.developerService.createDeveloper(postData);
  }

  @Get('list') // developer/list
  async getAllDeveloper(): Promise<DeveloperDto[]> {
    return await this.developerService.getAllDeveloper();
  }
  @Get(':id') //1
  async getDeveloper(@Param('id') id: number): Promise<DeveloperDto> {
    return await this.developerService.getDeveloper(id);
  }

  @Put(':id') //developer/1
  async updateBook(
    @Param('id') id: number,
    @Body() postData: DeveloperDto,
  ): Promise<DeveloperDto> {
    return await this.developerService.updateDeveloper(id, postData);
  }

  @Delete(':id')
  @UsePublic()
  async deletetDeveloper(@Param('id') id: number): Promise<DeveloperDto> {
    return await this.developerService.deleteDeveloper(id);
  }
}
