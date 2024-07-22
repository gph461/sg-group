import { Prisma } from '@prisma/client';

export class Developer implements Prisma.DeveloperCreateInput {
  id: number;
  name: string;
}
