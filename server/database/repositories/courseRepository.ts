import type { Course } from '@prisma/client';

import { prisma } from '../client';

export function getNewCourses(): Promise<Course[] | null> {
  return prisma.course.findMany({
    orderBy: { id: 'desc' },
    take: 4,
  });
}

export async function getCourses({ page, size }: { page: number; size: number }): Promise<{ courses: Course[] | null; count: number }> {
  const [courses, count] = await Promise.all([
    prisma.course.findMany({
      skip: page * size,
      take: size,
      orderBy: { id: 'desc' },
    }),
    prisma.course.count(),
  ]);
  return { courses, count };
}

export function getCourseById(id: number): Promise<Course | null> {
  return prisma.course.findUnique({
    where: { id },
    include: { catalogue: true },
  });
}
