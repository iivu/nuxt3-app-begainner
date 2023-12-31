import { getCourseById, getCourses } from '~/server/database/repositories/courseRepository';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id ? parseInt(event.context.params.id) : null;
  if (!id) return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }));
  try {
    const course = await getCourseById(id);
    if (!course) return sendError(event, createError({ statusCode: 404, statusMessage: 'Course not found' }));
    const { courses: recommend } = await getCourses({ page: 1, size: 2 });

    return { ok: true, data: { item: course, recommend } };
  } catch (e) {
    return sendError(event, createError('Internal server error'));
  }
});
