import { getNewColumns } from '~/server/database/repositories/columnRepository';
import { getNewCourses } from '~/server/database/repositories/courseRepository';

export default defineEventHandler(async (event) => {
  try {
    const columns = await getNewColumns();
    const courses = await getNewCourses();

    return { ok: true, data: { columns, courses } };
  } catch (error) {
    return sendError(event, createError('获取数据失败'));
  }
});
