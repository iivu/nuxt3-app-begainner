import { getCourses } from '~/server/database/repositories/courseRepository';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page ? parseInt(query.page as string) - 1 : 0;
    const size = query.size ? parseInt(query.size as string) : 8;

    const { courses, count } = await getCourses({ page, size });
    return { ok: true, data: { items: courses, count } };
  } catch (e) {
    return sendError(event, createError('Internal server error'));
  }
});
