import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '~libs/entities';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto implements Pick<User, 'email' | 'password'> {
  // @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  device_ip: string | null;
}
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
