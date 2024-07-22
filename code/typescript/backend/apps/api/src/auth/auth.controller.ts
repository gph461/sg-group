import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetUser } from '~backend/decorators';
import { UsePublic } from '~backend/guards/jwt-auth.guard';
import {
  ChangePasswordDto,
  LoginUserDto,
  RegisterUserDto,
} from '~backend/user/user.dto';
import { UserService } from '~backend/user/user.service';
import { LoginResponse, UserWithoutPassword } from '~libs/entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePublic()
  async register(@Body() dto: RegisterUserDto) {
    await this.userService.register(dto);
  }

  @Post('login')
  @UsePublic()
  async login(@Body() dto: LoginUserDto): Promise<LoginResponse> {
    const token = await this.userService.login(dto.email, dto.password);

    return { success: true, data: { token } };
  }

  @Post('change-password')
  async changePassword(
    @GetUser() user: UserWithoutPassword,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.userService.changePassword(user.id, dto.newPassword);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    await this.userService.logout(req.token);
  }
}
