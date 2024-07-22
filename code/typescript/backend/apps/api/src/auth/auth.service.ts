import { Injectable, UnauthorizedException } from '@nestjs/common';
import { db } from '~backend/db';
import { UserWithoutPassword } from '~libs/entities';

@Injectable()
export class AuthService {
  async validate(accessToken: string): Promise<UserWithoutPassword> {
    const session = await db.userSession.findFirst({
      where: { token: accessToken },
      select: {
        User: {
          omit: {
            password: true,
          },
        },
      },
    });
    if (!session?.User) throw new UnauthorizedException();
    return session.User;
  }
}
