import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUser } from '~backend/decorators';
import { UsePublic } from '~backend/guards/jwt-auth.guard';
import { UserWithoutPassword } from '~libs/entities';
import { RegisterUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePublic()
  async createUser(@Body() dto: RegisterUserDto) {
    await this.userService.register(dto);
  }

  @Get('profile')
  @UsePublic()
  async getProfile(
    @GetUser() user: UserWithoutPassword,
  ): Promise<UserWithoutPassword> {
    return user;
  }

  @Get(':id/profile')
  @UsePublic()
  getProfileById(
    @Param('idz') id: string,
    @GetUser() user: UserWithoutPassword,
  ) {
    return user;
  }
}
