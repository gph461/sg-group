import { Controller, Get, Param } from '@nestjs/common';
import { GetUser } from '~backend/decorators';
import { UsePublic } from '~backend/guards/jwt-auth.guard';
import { UserWithoutPassword } from '~libs/entities';

@Controller('user')
export class UserController {
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
