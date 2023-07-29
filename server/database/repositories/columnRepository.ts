import type { Column } from '@prisma/client';

import { prisma } from '../client';

export function getNewColumns(): Promise<Column[] | null> {
  return prisma.column.findMany({
    orderBy: { id: 'desc' },
    take: 4,
  });
}

export async function getColumns({ page, size }: { page: number; size: number }): Promise<{ columns: Column[] | null; count: number }> {
  const [columns, count] = await Promise.all([
    prisma.column.findMany({
      skip: page * size,
      take: size,
      orderBy: { id: 'desc' },
    }),
    prisma.column.count(),
  ]);
  return { columns, count };
}

export function getColumnById(id: number): Promise<Column | null> {
  return prisma.column.findUnique({
    where: { id },
  });
}
