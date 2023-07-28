import type { Course } from '@prisma/client';

import { prisma } from '../client';

export function getNewCourses(): Promise<Course[] | null> {
  return prisma.course.findMany({
    orderBy: { id: 'desc' },
    take: 4,
  });
}
