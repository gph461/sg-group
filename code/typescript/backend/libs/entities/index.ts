import { User } from '@prisma/client';
export * from './enums';
export * from './pagination';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type LoginResponse = ApiResponse<{ token: string }>;

export type UserWithoutPassword = Omit<User, 'password'>;

export { User };
