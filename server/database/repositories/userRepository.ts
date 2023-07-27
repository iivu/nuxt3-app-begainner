import { prisma } from '~/server/database/client';

import type { User } from '@prisma/client';
import type { IAuthor } from '~/types/IAuthor';

export function getUserByName(username: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function createUser(data: User) {
  const user = await prisma.user.create({ data });
  return user;
}
