import type { Column } from '@prisma/client';

import { prisma } from '../client';

export function getNewColumns(): Promise<Column[] | null> {
  return prisma.column.findMany({
    orderBy: { id: 'desc' },
    take: 4,
  });
}
